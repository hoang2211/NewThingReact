import { Inter } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import AlFooter from '@/components/layout/AlFooter'
import ActionBar from '@/components/common/ActionBar'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: {
    template: '%s - Handee',
    default: 'Handee - Invest at the perfect time.',
  },
  description:
    'By leveraging insights from our network of industry insiders, you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={clsx('bg-gray-50 antialiased', inter.variable)}>
      {/* <Header />
      <ActionBar /> */}
      <body>{children}</body>
      {/* <Footer /> */}
      {/* <AlFooter /> */}
    </html>
  )
}
