'use client'

import { MdSearch } from 'react-icons/md'

import { CardComponent } from '@/presentation/components/Card/CardComponent'
import { DatatableComponent } from '@/presentation/components/Datatable/DatatableComponent'
import styles from '@/presentation/screens/Dashboard/DashboardScreen.module.css'
import {
  columnsIntervalProducers,
  columnsMoviesPerYear,
  columnsStudios,
  columnsYearsWinners,
  useDashboardScreenRules,
} from '@/presentation/screens/Dashboard/DashboardScreen.rules'

export const DashboardScreen = () => {
  const {
    handleFetchPerYear,
    dataPerYearAdapt,
    dataYearsWinners,
    dataStudiosAdapt,
    dataIntervalProducers,
    setFilterPerYear,
    filterPerYear,
  } = useDashboardScreenRules()

  return (
    <section className={styles.container}>
      <div className={styles.container_grid}>
        <div className={styles.grid1}>
          <CardComponent title="List years with multiple winners">
            <DatatableComponent
              columns={columnsYearsWinners}
              rows={dataYearsWinners?.years ?? []}
            />
          </CardComponent>
        </div>

        <div className={styles.grid2}>
          <CardComponent title="Top 3 studios with winners">
            <DatatableComponent
              columns={columnsStudios}
              rows={dataStudiosAdapt ?? []}
            />
          </CardComponent>
        </div>

        <div className={styles.grid3}>
          <CardComponent title="Producers with longest and shortest interval between wins">
            <DatatableComponent
              title="Maximum"
              columns={columnsIntervalProducers}
              rows={dataIntervalProducers?.max ?? []}
            />

            <DatatableComponent
              title="Minimum"
              columns={columnsIntervalProducers}
              rows={dataIntervalProducers?.min ?? []}
            />
          </CardComponent>
        </div>

        <div className={styles.grid4}>
          <CardComponent title="List Movie winners by year">
            <div className={styles.container_search}>
              <input
                className={styles.input}
                placeholder="Search by year"
                type="number"
                min={1900}
                max={2024}
                value={filterPerYear ? filterPerYear : ''}
                onChange={({ target }) =>
                  setFilterPerYear(parseFloat(target.value))
                }
              />

              <button onClick={handleFetchPerYear} className={styles.button}>
                <MdSearch color="#fff" size={20} />
              </button>
            </div>

            {dataPerYearAdapt && (
              <DatatableComponent
                columns={columnsMoviesPerYear}
                rows={dataPerYearAdapt}
              />
            )}
          </CardComponent>
        </div>
      </div>
    </section>
  )
}
