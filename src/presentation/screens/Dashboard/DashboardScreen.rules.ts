import { useEffect, useMemo, useState } from 'react'

import { TColumn } from '@/presentation/components/Datatable/DatatableComponent.types'
import { useFetch } from '@/presentation/hooks/UseFecth/UseFecthHook'
import {
  IMovies,
  IMoviesProducer,
  IMoviesStudios,
  IMoviesYearsWinners,
  IntervalForProducersService,
  MoviesPerYearService,
  StudiosService,
  YearsWinnersService,
} from '@/services'

export const columnsYearsWinners: TColumn<IMoviesYearsWinners>[] = [
  {
    key: 'year',
    columnName: 'Year',
  },
  {
    key: 'winnerCount',
    columnName: 'Win count',
  },
]

export const columnsStudios: TColumn<IMoviesStudios>[] = [
  {
    key: 'name',
    columnName: 'Name',
  },
  {
    key: 'winCount',
    columnName: 'Win count',
  },
]

export const columnsIntervalProducers: TColumn<IMoviesProducer>[] = [
  {
    key: 'producer',
    columnName: 'Producer',
  },
  {
    key: 'interval',
    columnName: 'Interval',
  },
  {
    key: 'previousWin',
    columnName: 'Previous Year',
  },
  {
    key: 'followingWin',
    columnName: 'Following Year',
  },
]

export const columnsMoviesPerYear: TColumn<
  Pick<IMovies, 'id' | 'year' | 'title'>
>[] = [
  {
    key: 'id',
    columnName: 'Id',
  },
  {
    key: 'year',
    columnName: 'Year',
  },
  {
    key: 'title',
    columnName: 'Title',
  },
]

export const useDashboardScreenRules = () => {
  const [filterPerYear, setFilterPerYear] = useState<number>(0)

  const yearsWinnersHook = useFetch(YearsWinnersService)
  const studiosHook = useFetch(StudiosService)
  const intervalForProducers = useFetch(IntervalForProducersService)
  const moviesPerYearHook = useFetch(MoviesPerYearService)

  const dataPerYearAdapt = useMemo(
    () =>
      moviesPerYearHook?.data?.map((item) => ({
        id: item?.id,
        year: item?.year,
        title: item?.title,
      })),
    [moviesPerYearHook?.data]
  )

  const handleFetchPerYear = () => {
    moviesPerYearHook.handleFetch({
      filter: filterPerYear,
    })
  }

  useEffect(() => {
    yearsWinnersHook.handleFetch()
    studiosHook.handleFetch()
    intervalForProducers.handleFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    dataYearsWinners: yearsWinnersHook.data,
    dataStudios: studiosHook.data,
    dataIntervalProducers: intervalForProducers.data,
    handleFetchPerYear,
    dataPerYearAdapt,
    setFilterPerYear,
    filterPerYear,
  }
}
