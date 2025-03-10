import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import AlFooter from './AlFooter'
import ActionBar from '../common/ActionBar'
import { ToastContainer } from 'react-toastify'

export function UserLayout({ children }) {
  return (
    <>
      <Header />
      <ActionBar />
      <ToastContainer />
      <main className="flex-auto">{children}</main>
      {/* <Footer /> */}
      <AlFooter />
    </>
  )
}
