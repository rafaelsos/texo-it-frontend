import { useEffect, useMemo, useState } from 'react'

import { TColumn } from '@/presentation/components/Datatable/DatatableComponent.types'
import { useStateDebounce } from '@/presentation/hooks/UseDebounce/UseDebounce'
import { useFetch } from '@/presentation/hooks/UseFecth/UseFecthHook'
import styles from '@/presentation/screens/List/ListScreen.module.css'
import { IMovies, IMoviesRequest, MoviesService } from '@/services'

export const defaultRequest: Omit<IMoviesRequest, 'winner' | 'year'> = {
  page: 0,
  size: 12,
}

export const useListScreenRules = () => {
  const [filterYearDebounce, setFilterYearDebounce] = useStateDebounce(0)
  const [filterYear, setFilterYear] = useState<number>(0)
  const [filterWinner, setFilterWinner] = useState<string>()
  const [currentPage, setCurrentPage] = useState<number>(0)

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
      ...defaultRequest,
      ...(filterYearDebounce && { year: filterYearDebounce }),
      ...(filterWinner && { winner: filterWinner }),
      page: currentPage,
    }
  }, [filterYearDebounce, filterWinner, currentPage])

  useEffect(() => {
    moviesHook.handleFetch(requestFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestFilter])

  const columnsMovies: TColumn<
    Pick<IMovies, 'id' | 'year' | 'title' | 'winner'>
  >[] = [
    {
      key: 'id',
      columnName: 'Id',
    },
    {
      key: 'year',
      columnName: 'Year',
      actions: [
        <>
          <input
            className={styles.filter}
            placeholder="Search by year"
            type="number"
            max={2024}
            value={filterYear ? filterYear : ''}
            onChange={({ target }) =>
              handleFilterYear(parseFloat(target.value))
            }
          />
        </>,
      ],
    },
    {
      key: 'title',
      columnName: 'Title',
    },
    {
      key: 'winner',
      columnName: 'Winner?',
      actions: [
        <>
          <select
            className={styles.filter}
            value={filterWinner}
            onChange={({ target }) => setFilterWinner(target.value)}
          >
            <option value="">Yes/No</option>
            <option value={'Yes'}>Yes</option>
            <option value={'No'}>No</option>
          </select>
        </>,
      ],
    },
  ]

  return {
    dataMoviesAdapt,
    setCurrentPage,
    currentPage,
    moviesHook,
    columnsMovies,
  }
}
