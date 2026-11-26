import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MainLayout() {
  return (
    <div className="app-layout">
      <Header />
      <Navbar />

      <main className="app-layout__content">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout