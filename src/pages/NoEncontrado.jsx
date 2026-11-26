import { Link } from 'react-router-dom'

function NoEncontrado() {
  return (
    <section className="not-found">
      <span className="not-found__code">404</span>
      <h1>Pagina no encontrada</h1>
      <p>La direccion que buscas no existe o ya no esta disponible.</p>
      <Link className="not-found__link" to="/">
        Volver al inicio
      </Link>
    </section>
  )
}

export default NoEncontrado
