'use client'

import styles from '@/presentation/components/Card/CardComponent.module.css'
import { ICardComponentProps } from '@/presentation/components/Card/CardComponent.types'

export const CardComponent = ({
  title,
  children,
  fullHeight,
}: ICardComponentProps) => {
  const cardHeight = fullHeight ? { height: '100%' } : { height: '300px' }

  return (
    <div className={styles.card} style={cardHeight}>
      <span className={styles.title}>{title}</span>
      {children}
    </div>
  )
}
