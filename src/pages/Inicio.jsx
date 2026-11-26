import { Link } from 'react-router-dom'

// Guarda el texto y la ruta de cada tarjeta.
const secciones = [
    {
        titulo: 'Vitrina',
        descripcion: 'Explora los productos disponibles en la tienda.',
        textoImagen: 'Imagen de productos de la vitrina',
        textoBoton: 'Ver productos',
        ruta: '/catalogo',
    },
    {
        titulo: 'Mis compras',
        descripcion: 'Consulta tu canasta y el resumen de tu pedido.',
        textoImagen: 'Imagen de un carrito de compras',
        textoBoton: 'Ir a mis compras',
        ruta: '/compras',
    },
]

function Inicio() {
    return (
        <main className="inicio">
            <h1>Bienvenido a Merca Cauca</h1>
            <p>Encuentra productos y consulta tus compras.</p>

            <div className="inicio__secciones">
                {secciones.map((seccion) => (
                    <section className="inicio__tarjeta" key={seccion.ruta}>
                        {/* texto donde iria una imagen ya que no hay disponible  */}
                        <div
                            className="inicio__imagen-placeholder"
                            role="img"
                            aria-label={seccion.textoImagen}
                        >
                            {seccion.textoImagen}
                        </div>

                        <h2>{seccion.titulo}</h2>
                        <p>{seccion.descripcion}</p>

                        <Link className="inicio__boton" to={seccion.ruta}>
                            {seccion.textoBoton}
                        </Link>
                    </section>
                ))}
            </div>
        </main>
    )
}

export default Inicio