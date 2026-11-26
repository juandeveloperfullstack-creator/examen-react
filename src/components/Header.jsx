// importaciones como el hook useEffect, link para navegar y usestorecarrito carrito global.
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCarritoStore } from '../store/useCarritoStore'

function Header() {
    // Cuenta las unidades de todos los productos guardados en la canasta.
    const cantidadUnidades = useCarritoStore((state) =>
        state.productos.reduce(
            (total, producto) => total + (producto.cantidad ?? 1),
            0,
        ),
    )

    // Mantiene actualizado el texto que aparece en la pestana del navegador.
    useEffect(() => {
        document.title =
            cantidadUnidades > 0
                ? `(${cantidadUnidades}) evidencia final`
                : 'Evidencia final'
    }, [cantidadUnidades])

    return (
        <header className="site-header">
            {/* El nombre de la tienda tambien sirve para regresar al inicio. */}
            <Link to="/" className="site-header__brand" aria-label="Merca Cauca, inicio">
                <span>Merca Cauca</span>
            </Link>

            {/* aqui se abre la canasta y se muestra la cantidad de unidades */}
            <Link
                to="/carrito"
                className="site-header__cart"
                aria-label={`Canasta: ${cantidadUnidades} unidades`}
            >
                <span>Canasta</span>
                <span className="site-header__cart-count">{cantidadUnidades}</span>
            </Link>
        </header>
    )
}

export default Header