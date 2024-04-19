'use client'

import { CardComponent } from '@/presentation/components/Card/CardComponent'
import styles from '@/presentation/screens/List/ListScreen.module.css'
import { columnsMovies, useListScreenRules } from './ListScreen.rules'

export const List = () => {
  const {
    dataMoviesAdapt,
    handleFilterYear,
    filterYear,
    filterWinner,
    setFilterWinner,
    setCurrentPage,
    currentPage,
    moviesHook,
  } = useListScreenRules()

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
