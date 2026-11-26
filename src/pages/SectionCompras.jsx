import { NavLink, Outlet } from 'react-router-dom'

function SectionCompras() {
    return (
        <section className="compras">
            <h1>Mis compras</h1>

            {/* Texto temporal no hay imagen */}
            <div
                className="compras__portada-placeholder"
                role="img"
                aria-label="Imagen de una canasta de compras"
            >
                Imagen de una canasta de compras
            </div>

            {/* Estas pestañas permiten cambiar entre la canasta y el pedido */}
            <nav className="compras__pestanas" aria-label="Opciones de mis compras">
                <NavLink
                    to="/compras"
                    end
                    className={({ isActive }) =>
                        `compras__pestana ${isActive ? 'compras__pestana--activa' : ''}`
                    }
                >
                    Mi canasta
                </NavLink>

                <NavLink
                    to="/compras/resumen"
                    end
                    className={({ isActive }) =>
                        `compras__pestana ${isActive ? 'compras__pestana--activa' : ''}`
                    }
                >
                    Mi pedido
                </NavLink>
            </nav>

            {/* Aqui se carga la pagina de la pestaña seleccionada */}
            <div className="compras__contenido">
                <Outlet />
            </div>
        </section>
    )
}

export default SectionCompras