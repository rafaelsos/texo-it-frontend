'use client'

import { usePathname, useRouter } from 'next/navigation'

import styles from '@/presentation/components/NavBar/NavBarComponent.module.css'

export const NavbarComponent = () => {
  const route = useRouter()
  const path = usePathname()

  const isActiveScreen = (pathName: string) => {
    return path == pathName ? { fontWeight: 700 } : { fontWeight: 400 }
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
