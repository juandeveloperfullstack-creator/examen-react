import { NavLink, Outlet } from 'react-router-dom'

function SectionCatalogo() {
    return (
        <section className="catalogo">
            <h1>Vitrina</h1>

            {/* texto temporal para mostrar donde iria la imagen de portada */}
            <div
                className="catalogo__portada-placeholder"
                role="img"
                aria-label="Imagen de portada de la vitrina"
            >
                Imagen de portada de la vitrina
            </div>

            {/* estas dos pestañas cambian la forma de mostrar un producto */}
            <nav className="catalogo__pestanas" aria-label="Opciones de la vitrina">
                <NavLink
                    to="/catalogo"
                    end
                    className={({ isActive }) =>
                        `catalogo__pestana ${isActive ? 'catalogo__pestana--activa' : ''}`
                    }
                >
                    Productos con Fetch
                </NavLink>

                <NavLink
                    to="/catalogo/axios"
                    end
                    className={({ isActive }) =>
                        `catalogo__pestana ${isActive ? 'catalogo__pestana--activa' : ''}`
                    }
                >
                    Productos con Axios
                </NavLink>
            </nav>

            {/* aqui aparece la subpestaña elegida por la persona */}
            <div className="catalogo__contenido">
                <Outlet />
            </div>
        </section>
    )
}

export default SectionCatalogo