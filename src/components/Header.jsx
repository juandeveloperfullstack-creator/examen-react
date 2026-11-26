import { useEffect } from 'react';
import { useCarritoStore } from '../store/useCarritoStore';

function Header() {
    const cantidadProductos = useCarritoStore((state) =>
    state.productos.reduce(
        (total,producto) => total + (producto.cantidad ?? 1),
        0,
    ),
)

useEffect(() => {
    document.title =
    cantidadProductos > 0
    ? `(${cantidadProductos}) evidencia final`
    : 'Evidencia Final'
}, [cantidadProductos])
    return (
        <header>
            <span>Evidencia Final</span>
        </header>
    )
}
export default Header;