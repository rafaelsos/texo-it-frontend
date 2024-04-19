import { ReactNode } from 'react'

export type TColumn<T, TK extends keyof T = keyof T> = {
  key: TK
  columnName: React.ReactNode | string
  actions?: ReactNode
}

export type TDatatableComponentProps<T, TK extends keyof T = keyof T> = {
  rows: T[]
  columns: TColumn<T, TK>[]
  title?: string
}
