import { Outlet } from 'react-router-dom' // importamos el outle para que el contenido de la pagina cambie y los demas permanezca igual
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MainLayout() {
  return (
    <div className="app-layout">
      {/* el encabezado, la navegacion y el pie de pagina siempre permanecen cuando se cambia de pagina */}
      <Header />
      <Navbar />

      {/* aqui se muestra la ruta que la persona eligio */}
      <main className="app-layout__content">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout