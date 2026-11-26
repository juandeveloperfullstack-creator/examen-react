import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Inicio from './pages/Inicio'
import ProductosAxios from './pages/ProductosAxios'
import ProductosFetch from './pages/ProductosFetch'
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
          <Route
            index
            element={
              <section>
                <h2>Mi canasta</h2>
                <p>El contenido de la canasta se agregara despues.</p>
              </section>
            }
          />
          <Route
            path="resumen"
            element={
              <section>
                <h2>Mi pedido</h2>
                <p>El resumen del pedido se agregara despues.</p>
              </section>
            }
          />
        </Route>

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
