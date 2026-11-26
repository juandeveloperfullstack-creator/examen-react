import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Inicio from './pages/Inicio'
import ProductosAxios from './pages/ProductosAxios'
import ProductosFetch from './pages/ProductosFetch'
import SectionCatalogo from './pages/SectionCatalogo'

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

        {/* Estas pantallas son temporales hasta completar las paginas de compras. */}
        <Route
          path="compras"
          element={
            <section>
              <h1>Mi canasta</h1>
              <p>Esta pagina se completara en el requerimiento de la canasta.</p>
            </section>
          }
        />
        <Route
          path="compras/resumen"
          element={
            <section>
              <h1>Mi pedido</h1>
              <p>Esta pagina se completara en el requerimiento del pedido.</p>
            </section>
          }
        />

        {/* Muestra un mensaje si la direccion no corresponde a una pagina. */}
        <Route
          path="*"
          element={
            <section>
              <h1>Pagina no encontrada</h1>
              <p>Revisa la direccion o vuelve al inicio.</p>
            </section>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
