import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Carrito from './pages/Carrito'
import Inicio from './pages/Inicio'
import NoEncontrado from './pages/NoEncontrado'
import ProductosAxios from './pages/ProductosAxios'
import ProductosFetch from './pages/ProductosFetch'
import Resumen from './pages/Resumen'
import SectionCatalogo from './pages/SectionCatalogo'
import SectionCompras from './pages/SectionCompras'

function App() {
  return (
    <Routes>
      {/* Estas paginas comparten el mismo encabezado, menu y pie de pagina. */}
      <Route element={<MainLayout />}>
        <Route index element={<Inicio />} />

        {/* La vitrina muestra Fetch al entrar y Axios en su pestaña interna. */}
        <Route path="catalogo" element={<SectionCatalogo />}>
          <Route index element={<ProductosFetch />} />
          <Route path="axios" element={<ProductosAxios />} />
        </Route>

        {/* Ambas paginas de compras comparten la portada y las pestañas. */}
        <Route path="compras" element={<SectionCompras />}>
          <Route index element={<Carrito />} />
          <Route path="resumen" element={<Resumen />} />
        </Route>

        {/* Si no sxe coincide con ninguna ruta, muestra la pagina 404. */}
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  )
}

export default App
