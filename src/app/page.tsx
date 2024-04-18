import { Metadata } from 'next'

import { DashboardScreen } from '@/presentation/screens/Dashboard/DashboardScreen'

export const metadata: Metadata = {
  title: {
    template: '%s | Texo It',
    default: 'Dashboard | Texo It',
  },
}

export default function Page() {
  return <DashboardScreen />
}
