import { useLocation, useNavigate } from 'react-router-dom' // importaciones que me perimite navegar entre paginas y saber tambien en cual estoy ubicado

// el texto que aparece en cada boton y las rutas a las que me envia
const botones = [
    { texto: 'Inicio', ruta: '/' },
    { texto: 'Vitrina', ruta: '/catalogo' },
    { texto: 'Mi canasta', ruta: '/compras' },
    { texto: 'Mi pedido', ruta: '/compras/resumen' },
]

function Navbar() {
    // me permite ir a otra pagina cuando se presiona un boton.
    const navigate = useNavigate()
    // aqui se guarda la ruta actual para resaltarla 
    const { pathname } = useLocation()

    // la funcion verifica si la ruta actual cumple con el boton
    function estaActivo(ruta) {
        if (ruta === '/') {
            return pathname === '/'
        }

        // Vitrina tambien queda resaltada en sus paginas internas, como /catalogo/axios
        if (ruta === '/catalogo') {
            return pathname === '/catalogo' || pathname.startsWith('/catalogo/')
        }

        // Las demas opciones se resaltan cuando la direccion coincide exactamente con la ruta
        return pathname === ruta
    }

    return (
        <nav className="navbar" aria-label="Navegación principal">
            {/* aqui se recorren las opciones y crea un boton para cada una. */}
            {botones.map(({ texto, ruta }) => {
                const activo = estaActivo(ruta)

                // la direccion me sirve para identificar el boton y al presionarlo cambia de pagina.
                return (
                    <button
                        key={ruta}
                        type="button"
                        className={`navbar__button ${activo ? 'navbar__button--active' : ''}`} // aqui la clase adicional permite darle otro estilo al boton de la pagina cuando se esta en ella.
                        aria-current={activo ? 'page' : undefined}
                        onClick={() => navigate(ruta)}
                    >
                        {texto}
                    </button>
                )
            })}
        </nav>
    )
}

export default Navbar