'use client'

import { SetStateAction, useEffect, useMemo, useState } from 'react'

import { CardComponent } from '@/presentation/components/Card/CardComponent'
import { TColumn } from '@/presentation/components/Datatable/DatatableComponent.types'
import { useFetch } from '@/presentation/hooks/UseFecth/UseFecthHook'
import { IMovies } from '@/presentation/screens/Dashboard/DashboardScreen.types'
import styles from '@/presentation/screens/List/ListScreen.module.css'
import { IRequest, MoviesService } from '@/services/Movies/MoviesService'

interface IMoviesDraft extends Omit<IMovies, 'winner'> {
  winner: string
}

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

const initialRequest: IRequest = {
  page: 0,
  size: 99,
  winner: false,
  year: 1990,
}

let timer: ReturnType<typeof setTimeout>

const debounce = <TFn extends (...args: any[]) => any>(
  callback: TFn,
  timeout: number = 500
) => {
  return (...params: Parameters<TFn>) => {
    clearTimeout(timer)

    timer = setTimeout(() => callback(...params), timeout)
  }
}

export const useStateDebounce = (
  initialValue: any,
  timeout = 500
): [typeof initialValue, (value: SetStateAction<any>) => void] => {
  const [value, setValue] = useState<typeof initialValue>(initialValue)
  const setValueDebounce = debounce(setValue, timeout)

  return [value, setValueDebounce]
}

export const List = () => {
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

  return (
    <section className={styles.container_screen}>
      <CardComponent title="List movies" fullHeight>
        <div className={styles.container_table}>
          <table>
            <thead>
              <tr>
                {columnsMovies.map((column, index) => (
                  <th key={index}>
                    <div>
                      {column.columnName}

                      {column.columnName === 'Year' && (
                        <input
                          className={styles.input}
                          placeholder="Search by year"
                          type="number"
                          min={1900}
                          max={2024}
                          value={filterYear ? filterYear : ''}
                          onChange={({ target }) =>
                            handleFilterYear(parseFloat(target.value))
                          }
                        />
                      )}

                      {column.columnName === 'Winner?' && (
                        <select
                          className={styles.input}
                          value={filterWinner}
                          onChange={({ target }) =>
                            setFilterWinner(target.value)
                          }
                        >
                          <option value={'Yes'}>Yes</option>
                          <option value={'No'}>No</option>
                        </select>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataMoviesAdapt?.map((item: Record<string, any>, index) => (
                <tr key={index}>
                  {Object.keys(item).map((itemKey) => (
                    <td key={itemKey}>{item[itemKey]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {moviesHook?.data && (
            <div className={styles.pagination}>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={moviesHook?.data?.first}
                className={styles.button_pagination}
              >
                {'<<'}
              </button>

              {[moviesHook.data.totalPages].map((item) => (
                <button
                  key={item}
                  onClick={() => setCurrentPage(item - 1)}
                  className={styles.button_pagination}
                >
                  {item}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={moviesHook?.data?.last}
                className={styles.button_pagination}
              >
                {'>>'}
              </button>
            </div>
          )}

          <span>
            Page {moviesHook?.data?.pageable?.pageNumber} of{' '}
            {moviesHook?.data?.totalPages} total elements{' '}
            {moviesHook?.data?.totalElements}
          </span>
        </div>
      </CardComponent>
    </section>
  )
}
