'use client'

import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

import { CardComponent } from '@/presentation/components/Card/CardComponent'
import { DatatableComponent } from '@/presentation/components/Datatable/DatatableComponent'
import styles from '@/presentation/screens/List/ListScreen.module.css'
import { useListScreenRules } from '@/presentation/screens/List/ListScreen.rules'

export const ListScreen = () => {
  const {
    dataMoviesAdapt,
    setCurrentPage,
    currentPage,
    moviesHook,
    columnsMovies,
  } = useListScreenRules()

  return (
    <section className={styles.container_screen}>
      <CardComponent title="List movies" fullHeight>
        <DatatableComponent columns={columnsMovies} rows={dataMoviesAdapt} />

        {moviesHook?.data && moviesHook?.data?.totalPages > 0 && (
          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={moviesHook?.data?.first}
            >
              <MdArrowBackIos />
            </button>

            {Array.from(Array(moviesHook.data.totalPages).keys()).map(
              (item) => (
                <button
                  key={item}
                  disabled={item === currentPage}
                  onClick={() => setCurrentPage(item)}
                >
                  {item + 1}
                </button>
              )
            )}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={moviesHook?.data?.last}
            >
              <MdArrowForwardIos />
            </button>
          </div>
        )}
      </CardComponent>
    </section>
  )
}
