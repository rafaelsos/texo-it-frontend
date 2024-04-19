import { Metadata } from 'next'

import { List } from '@/presentation/screens/List/ListScreen'

export const metadata: Metadata = {
  title: {
    template: '%s | Texo It',
    default: 'List | Texo It',
  },
}

export default function Page() {
  return <List />
}
