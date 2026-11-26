// variable aprendiz con mis credenciales
const aprendiz = {
    nombre: 'Juan David Hernandez Mosquera',
    ficha: '3223898',
}

// vriable para almacenar las apis con nombre y direcion para eso se usa el arreglo
const apisUsadas = [
    {
        nombre: 'DummyJSON - productos',
        url: 'https://dummyjson.com/products?limit=24',
    },
    {
        nombre: 'Fake Store API - productos',
        url: 'https://fakestoreapi.com/products',
    },
]

function Footer() {
    // metodos para obtener el año actual
    const anioActual = new Date().getFullYear()

    return (
        <footer className="site-footer">
            {/* mi nombre y ficha a la que pertenezco */}
            <p>Aprendiz: {aprendiz.nombre}</p>
            <p>Ficha: {aprendiz.ficha}</p>

            {/* año actual con el nombre de la tienda */}
            <p>&copy; {anioActual} Merca Cauca</p>

            {/* cada enlance se abre en una pestaña difernete donde se pueden ver cada una */}
            <nav className="site-footer__apis" aria-label="APIs utilizadas">
                {apisUsadas.map((api) => (
                    <a
                        key={api.url}
                        href={api.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {api.nombre}
                    </a>
                ))}
            </nav>
        </footer>
    )
}

export default Footer