import { useEffect, useState } from 'react'
import { useCarritoStore } from '../store/useCarritoStore.js'

const URL_PRODUCTOS = 'https://fakestoreapi.com/products' // variable donde se almacena la API

// el precio que llevara los productos
const formatoPrecio = new Intl.NumberFormat('es', {
    style: 'currency',
    currency: 'USD',
})

function ProductosFetch() {
    const agregarProducto = useCarritoStore((state) => state.agregarProducto)

    // aqui se guardan los productos recibidos y el texto que se escribe en el buscador.
    const [productos, setProductos] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    // aqui se piden los productos cuando se abre esta subpagina.
    useEffect(() => {
        const controller = new AbortController()
// funcion asincrona para cargar los productos
        async function cargarProductos() {
            setCargando(true)
            setError('')

            try {
                const respuesta = await fetch(URL_PRODUCTOS, { // consulta en la appi
                    signal: controller.signal,
                })

                if (!respuesta.ok) { 
                    throw new Error('No se pudo completar la solicitud.')
                }

                const datos = await respuesta.json()

                if (!Array.isArray(datos)) {
                    throw new Error('La respuesta recibida no tiene el formato esperado.')
                }

                setProductos(datos)
            } catch (errorSolicitud) {
                // Si se cancelo la solicitud al salir de la pagina, no mostramos un error.
                if (errorSolicitud.name === 'AbortError') {
                    return
                }

                setError('No se pudieron cargar los productos. Intenta de nuevo.')
            } finally {
                // Evita actualizar el estado si la pagina ya se cerro
                if (!controller.signal.aborted) {
                    setCargando(false)
                }
            }
        }

        cargarProductos()

        // se cancela la solicitud si la persona sale de esta subpagina.
        return () => controller.abort()
    }, [])

    // solo se muestran solo los productos cuyo nombre coincide con lo escrito
    const productosFiltrados = productos.filter((producto) =>
        producto.title.toLowerCase().includes(busqueda.trim().toLowerCase()),
    )

    return (
        <section className="productos-fetch">
            <h1>Productos con Fetch</h1>

            <label htmlFor="buscar-productos">Buscar por nombre</label>
            <input
                id="buscar-productos"
                className="productos-fetch__buscador"
                type="search"
                value={busqueda}
                onChange={(evento) => setBusqueda(evento.target.value)}
                placeholder="Escribe el nombre de un producto"
            />

            {cargando && (
                <p className="loading-message" role="status">
                    Cargando productos...
                </p>
            )}

            {!cargando && error && <p role="alert">{error}</p>}

            {!cargando && !error && productosFiltrados.length === 0 && (
                <p>No se encontraron productos con ese nombre.</p>
            )}

            {!cargando && !error && productosFiltrados.length > 0 && (
                <div className="productos-fetch__lista">
                    {productosFiltrados.map((producto) => (
                        <article className="producto-card" key={producto.id}>
                            <img
                                className="producto-card__imagen"
                                src={producto.image}
                                alt={producto.title}
                                loading="lazy"
                            />
                            <h2>{producto.title}</h2>
                            <p>{producto.category}</p>
                            <p>{formatoPrecio.format(producto.price)}</p>
                            <button
                                className="producto-card__agregar"
                                type="button"
                                onClick={() =>
                                    agregarProducto({
                                        ...producto,
                                        origen: 'fakestoreapi',
                                    })
                                }
                            >
                                Agregar a la canasta
                            </button>
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}

export default ProductosFetch