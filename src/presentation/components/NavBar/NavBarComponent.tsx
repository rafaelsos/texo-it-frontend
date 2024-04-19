'use client'

import { usePathname, useRouter } from 'next/navigation'

import styles from '@/presentation/components/NavBar/NavBarComponent.module.css'

export const NavbarComponent = () => {
  const route = useRouter()
  const path = usePathname()

  const isActiveScreen = (pathName: string) => {
    return path == pathName
      ? { fontWeight: 600, color: '#7ba8d5' }
      : { fontWeight: 400, color: '#b3adad' }
  }

  return (
    <div className={styles.navbar}>
      <span style={isActiveScreen('/')} onClick={() => route.push('/')}>
        Dashboard
      </span>
      <span style={isActiveScreen('/list')} onClick={() => route.push('/list')}>
        List
      </span>
    </div>
  )
}
