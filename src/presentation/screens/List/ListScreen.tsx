'use client'

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

        {moviesHook?.data && (
          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={moviesHook?.data?.first}
            >
              {'<<'}
            </button>

            {[moviesHook.data.totalPages].map((item) => (
              <button key={item} onClick={() => setCurrentPage(item - 1)}>
                {item}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={moviesHook?.data?.last}
            >
              {'>>'}
            </button>
          </div>
        )}
      </CardComponent>
    </section>
  )
}
