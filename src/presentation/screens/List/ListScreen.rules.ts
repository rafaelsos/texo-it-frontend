import { useEffect, useMemo, useState } from 'react'

import { TColumn } from '@/presentation/components/Datatable/DatatableComponent.types'
import { useStateDebounce } from '@/presentation/hooks/UseDebounce/UseDebounce'
import { useFetch } from '@/presentation/hooks/UseFecth/UseFecthHook'
import { IMoviesDraft } from '@/presentation/screens/List/ListScreen.types'
import { IRequest, MoviesService } from '@/services/Movies/MoviesService'

export const columnsMovies: TColumn<
  Pick<IMoviesDraft, 'id' | 'year' | 'title' | 'winner'>
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
  {
    key: 'winner',
    columnName: 'Winner?',
  },
]

export const initialRequest: IRequest = {
  page: 0,
  size: 99,
  winner: false,
  year: 1990,
}

export const useListScreenRules = () => {
  const [filterYear, setFilterYear] = useState<number>(0)
  const [filterWinner, setFilterWinner] = useState<string>('No')
  const [filterYearDebounce, setFilterYearDebounce] = useStateDebounce(0)

  const [currentPage, setCurrentPage] = useState(0)

  const moviesHook = useFetch(MoviesService)

  const handleFilterYear = (value: number) => {
    setFilterYearDebounce(value)
    setFilterYear(value)
  }

  const dataMoviesAdapt = useMemo(
    () =>
      moviesHook?.data?.content?.map((item) => ({
        id: item.id,
        year: item.year,
        title: item.title,
        winner: item.winner ? 'Yes' : 'No',
      })) ?? [],
    [moviesHook?.data?.content]
  )

  const requestFilter = useMemo(() => {
    return {
      ...initialRequest,
      ...(filterYearDebounce && { year: filterYearDebounce }),
      ...(filterWinner && { winner: filterWinner === 'Yes' }),
      page: currentPage,
    }
  }, [filterYearDebounce, filterWinner, currentPage])

  useEffect(() => {
    moviesHook.handleFetch(requestFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestFilter])

  return {
    dataMoviesAdapt,
    handleFilterYear,
    filterYear,
    filterWinner,
    setFilterWinner,
    setCurrentPage,
    currentPage,
    moviesHook,
  }
}
