import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'

export function Layout({ children }) {
  return (
    <>
      {/* <Header /> */}
      <main className="flex-auto">{children}</main>
      {/* <Footer /> */}
    </>
  )
}
