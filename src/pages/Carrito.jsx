// Permite leer la canasta compartida y usar sus acciones.
import { useCarritoStore } from '../store/useCarritoStore.js'

// Muestra los precios con formato de moneda en dolares.
const formatoPrecio = new Intl.NumberFormat('es', {
    style: 'currency',
    currency: 'USD',
})

function Carrito() {
    // Estos datos se actualizan cuando cambia la canasta en cualquier parte de la app
    const productos = useCarritoStore((state) => state.productos)
    const sumarUnidad = useCarritoStore((state) => state.sumarUnidad)
    const restarUnidad = useCarritoStore((state) => state.restarUnidad)
    const eliminarProducto = useCarritoStore((state) => state.eliminarProducto)
    const vaciarCarrito = useCarritoStore((state) => state.vaciarCarrito)

    // Sirve para mostrar el mensaje vacio y desactivar el boton de vaciar
    const canastaVacia = productos.length === 0

    return (
        <section className="carrito">
            {/* Titulo de esta pagina dentro de la seccion de compras */}
            <h2>Mi canasta</h2>

            {/* Si no hay productos, se muestra un mensaje en vez de la lista */}
            {canastaVacia ? (
                <p className="carrito__vacio">Tu canasta está vacía.</p>
            ) : (
                <div className="carrito__productos">
                    {/* Crea una tarjeta para cada producto de la canasta */}
                    {productos.map((producto) => {
                        // Calcula el subtotal de este producto
                        const cantidad = producto.cantidad ?? 1
                        const subtotal = producto.price * cantidad
                        const claveProducto = producto.claveCarrito ?? producto.id
                        // Las dos APIs usan nombres distintos para la imagen
                        const imagen = producto.image ?? producto.thumbnail

                        return (
                            <article className="carrito__producto" key={claveProducto}>
                                {/* Si no hay imagen, muestra un texto en su lugar */}
                                {imagen ? (
                                    <img src={imagen} alt={producto.title} loading="lazy" />
                                ) : (
                                    <p>Imagen del producto</p>
                                )}

                                <h3>{producto.title}</h3>
                                <p>Precio por unidad: {formatoPrecio.format(producto.price)}</p>
                                <p>Unidades: {cantidad}</p>
                                <p>Subtotal: {formatoPrecio.format(subtotal)}</p>

                                {/* Estos botones actualizan la cantidad o quitan el producto */}
                                <button
                                    type="button"
                                    onClick={() => restarUnidad(claveProducto)}
                                    disabled={canastaVacia}
                                >
                                    Restar unidad
                                </button>
                                <button
                                    type="button"
                                    onClick={() => sumarUnidad(claveProducto)}
                                    disabled={canastaVacia}
                                >
                                    Sumar unidad
                                </button>
                                <button
                                    type="button"
                                    onClick={() => eliminarProducto(claveProducto)}
                                    disabled={canastaVacia}
                                >
                                    Eliminar producto
                                </button>
                            </article>
                        )
                    })}
                </div>
            )}

            {/* Permite vaciar toda la canasta y se desactiva cuando ya esta vacia */}
            <button
                type="button"
                onClick={vaciarCarrito}
                disabled={canastaVacia}
            >
                Vaciar canasta
            </button>
        </section>
    )
}

export default Carrito