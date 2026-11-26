import { useState } from 'react'
import { useCarritoStore } from '../store/useCarritoStore.js'

const COSTO_ENVIO = 0

const formatoPrecio = new Intl.NumberFormat('es', {
    style: 'currency',
    currency: 'USD',
})

function Resumen() {
    const [pedidoConfirmado, setPedidoConfirmado] = useState(false)
    const productos = useCarritoStore((state) => state.productos)
    const vaciarCarrito = useCarritoStore((state) => state.vaciarCarrito)

    const canastaVacia = productos.length === 0

    // se suman las unidades de todos los productos.
    const unidades = productos.reduce(
        (total, producto) => total + (producto.cantidad ?? 1),
        0,
    )

    // Calcula el subtotal con el precio y la cantidad de cada producto
    const subtotal = productos.reduce(
        (total, producto) =>
            total + producto.price * (producto.cantidad ?? 1),
        0,
    )

    // No se cobra envío si la canasta no tiene productos
    const envio = canastaVacia ? 0 : COSTO_ENVIO
    const total = subtotal + envio

    return (
        <section className="resumen">
            <h2>Mi pedido</h2>

            {canastaVacia && <p>Agrega productos para ver el resumen del pedido.</p>}

            <p>Unidades: {unidades}</p>
            <p>Subtotal: {formatoPrecio.format(subtotal)}</p>
            <p>Envío: {formatoPrecio.format(envio)}</p>
            <p>Total: {formatoPrecio.format(total)}</p>

            {pedidoConfirmado && (
                <p className="pedido-confirmado" role="status">
                    Pedido confirmado. Gracias por comprar en Merca Cauca.
                </p>
            )}

            <div className="resumen__acciones">
                <button
                    type="button"
                    onClick={() => {
                        vaciarCarrito()
                        setPedidoConfirmado(false)
                    }}
                    disabled={canastaVacia}
                >
                    Vaciar canasta
                </button>
                <button
                    type="button"
                    onClick={() => setPedidoConfirmado(true)}
                    disabled={canastaVacia || pedidoConfirmado}
                >
                    Confirmar pedido
                </button>
            </div>
        </section>
    )
}

export default Resumen