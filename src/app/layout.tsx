import { Inter } from 'next/font/google'

import { HeaderComponent } from '@/presentation/components/Header/HeaderComponent'
import { NavbarComponent } from '@/presentation/components/NavBar/NavBarComponent'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderComponent />

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
          }}
        >
          <NavbarComponent />

          {children}
        </div>
      </body>
    </html>
  )
}
