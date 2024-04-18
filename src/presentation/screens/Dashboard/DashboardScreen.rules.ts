import { useEffect, useMemo, useState } from 'react'

import { TColumn } from '@/presentation/components/Datatable/DatatableComponent.types'
import { useFetch } from '@/presentation/hooks/UseFecth/UseFecthHook'
import {
  IMoviesIntervalForProducers,
  IMoviesPerYear,
  IMoviesProducer,
  IMoviesStudios,
  IMoviesYearsWinners,
  IStudios,
  IYearsWinners,
} from '@/presentation/screens/Dashboard/DashboardScreen.types'

export const columnsYearsWinners: TColumn<IYearsWinners>[] = [
  {
    key: 'year',
    columnName: 'Year',
  },
  {
    key: 'winnerCount',
    columnName: 'Win count',
  },
]

export const columnsStudios: TColumn<IStudios>[] = [
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
  Pick<IMoviesPerYear, 'id' | 'year' | 'title'>
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

  const { data: dataYearsWinners, handleFetch: fetchYearsWinners } =
    useFetch<IMoviesYearsWinners>('?projection=years-with-multiple-winners')

  const { data: dataStudios, handleFetch: fetchStudios } =
    useFetch<IMoviesStudios>('?projection=studios-with-win-count')

  const { data: dataIntervalProducers, handleFetch: fetchIntervalProducers } =
    useFetch<IMoviesIntervalForProducers>(
      '?projection=max-min-win-interval-for-producers'
    )

  const { data: dataPerYear, handleFetch: fetchPerYear } = useFetch<
    IMoviesPerYear[]
  >(`?winner=true&year=${filterPerYear}`)

  const dataPerYearAdapt = useMemo(
    () =>
      dataPerYear?.map((item) => ({
        id: item?.id,
        year: item?.year,
        title: item?.title,
      })),
    [dataPerYear]
  )

  const handleFetchPerYear = () => {
    fetchPerYear()
  }

  useEffect(() => {
    fetchYearsWinners()
    fetchStudios()
    fetchIntervalProducers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('dataPerYearAdapt', dataPerYearAdapt)

  return {
    handleFetchPerYear,
    dataPerYearAdapt,
    dataYearsWinners,
    dataStudios,
    dataIntervalProducers,
    setFilterPerYear,
    filterPerYear,
  }
}
