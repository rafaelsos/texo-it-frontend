'use client'

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
    dataStudios,
    dataIntervalProducers,
    setFilterPerYear,
    filterPerYear,
  } = useDashboardScreenRules()

  return (
    <section className={styles.container}>
      <div className={styles.container_grid}>
        <div className={styles.grid1}>
          <div className={styles.card}>
            <span className={styles.title}>
              List years with multiple winners
            </span>
            <DatatableComponent
              columns={columnsYearsWinners}
              rows={dataYearsWinners?.years ?? []}
            />
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.card}>
            <span className={styles.title}>Top 3 studios with winners</span>
            <DatatableComponent
              columns={columnsStudios}
              rows={dataStudios?.studios ?? []}
            />
          </div>
        </div>
        <div className={styles.grid3}>
          <div className={styles.card}>
            <span className={styles.title}>
              Producers with longest and shortest interval between wins
            </span>
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
          </div>
        </div>
        <div className={styles.grid4}>
          <div className={styles.card}>
            <span className={styles.title}>List Movie winners by year</span>

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
                <span> Icon search</span>
              </button>
            </div>

            <DatatableComponent
              columns={columnsMoviesPerYear}
              rows={dataPerYearAdapt ?? []}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
