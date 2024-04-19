'use client'

import styles from '@/presentation/components/Datatable/DatatableComponent.module.css'
import { TDatatableComponentProps } from '@/presentation/components/Datatable/DatatableComponent.types'

export const DatatableComponent = <
  T extends Record<string, any>,
  TK extends keyof T,
>({
  rows,
  columns,
  title,
}: TDatatableComponentProps<T, TK>) => {
  return (
    <div className={styles.container_table}>
      {title && <span className={styles.title_table}>{title}</span>}
      <table>
        <thead>
          <tr>
            {columns.map((item, index) => (
              <th key={index}>
                {item.columnName}
                {!!item.actions && item.actions}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((item, index) => (
            <tr key={index}>
              {Object.keys(item).map((itemKey) => (
                <td key={itemKey}>{item[itemKey]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
