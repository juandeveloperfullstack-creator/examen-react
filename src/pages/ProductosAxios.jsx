import { useEffect, useState } from 'react'
import { obtenerCategorias, obtenerProductos } from '../api/apiDummy.js'

const formatoPrecio = new Intl.NumberFormat('es', {
    style: 'currency',
    currency: 'USD',
})
/* aqui se guardan las categorias  */
function ProductosAxios() {
    const [categorias, setCategorias] = useState([])
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas')
    const [productos, setProductos] = useState([])
    const [cargandoCategorias, setCargandoCategorias] = useState(true)
    const [cargandoProductos, setCargandoProductos] = useState(true)
    const [errorCategorias, setErrorCategorias] = useState('')
    const [errorProductos, setErrorProductos] = useState('')

    // Carga las categorias cuando se abre esta subpagina.
    useEffect(() => {
        const controller = new AbortController()

        async function cargarCategorias() {
            try {
                const datos = await obtenerCategorias({ signal: controller.signal })

                if (!Array.isArray(datos)) {
                    throw new Error('La respuesta de categorias no tiene el formato esperado.')
                }

                setCategorias(datos)
            } catch {
                // Si se cancelo la solicitud al salir, no hace falta mostrar un error.
                if (controller.signal.aborted) return
                setErrorCategorias('No se pudieron cargar las categorias.')
            } finally {
                if (!controller.signal.aborted) {
                    setCargandoCategorias(false)
                }
            }
        }

        cargarCategorias()

        // Cancela la solicitud de categorias si se sale de la pagina
        return () => controller.abort()
    }, [])

    // Vuelve a pedir los productos cada vez que cambia la categoria seleccionada
    useEffect(() => {
        const controller = new AbortController()

        async function cargarProductos() {
            setCargandoProductos(true)
            setErrorProductos('')
            setProductos([])

            try {
                const datos = await obtenerProductos(categoriaSeleccionada, {
                    signal: controller.signal,
                })
                setProductos(datos)
            } catch {
                // Ignora la solicitud cancelada y muestra un mensaje si ocurre otro error
                if (controller.signal.aborted) return
                setErrorProductos('No se pudieron cargar los productos.')
            } finally {
                if (!controller.signal.aborted) {
                    setCargandoProductos(false)
                }
            }
        }

        cargarProductos()

        // Al cambiar de categoria, cancela la solicitud anterior
        return () => controller.abort()
    }, [categoriaSeleccionada])

    return (
        <section className="productos-axios">
            <h1>Productos con Axios</h1>

            <label htmlFor="categoria-productos">Filtrar por categoria</label>
            <select
                id="categoria-productos"
                className="productos-axios__selector"
                value={categoriaSeleccionada}
                onChange={(evento) => setCategoriaSeleccionada(evento.target.value)}
            >
                <option value="todas">Todas las categorias</option>
                {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                        {categoria}
                    </option>
                ))}
            </select>

            {cargandoCategorias && <p role="status">Cargando categorias...</p>}
            {errorCategorias && <p role="alert">{errorCategorias}</p>}
            {cargandoProductos && <p role="status">Cargando productos...</p>}
            {!cargandoProductos && errorProductos && (
                <p role="alert">{errorProductos}</p>
            )}

            {!cargandoProductos && !errorProductos && productos.length === 0 && (
                <p>No hay productos en esta categoria.</p>
            )}

            {!cargandoProductos && !errorProductos && productos.length > 0 && (
                <div className="productos-axios__lista">
                    {productos.map((producto) => (
                        <article className="producto-card" key={producto.id}>
                            <img
                                className="producto-card__imagen"
                                src={producto.thumbnail}
                                alt={producto.title}
                                loading="lazy"
                            />
                            <h2>{producto.title}</h2>
                            <p>{producto.category}</p>
                            <p>{formatoPrecio.format(producto.price)}</p>
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}

export default ProductosAxios