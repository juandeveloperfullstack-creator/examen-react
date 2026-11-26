import axios from 'axios'

// aqui configuramos la api de una vez con las demas funciones se agregan el resto de la ruta 
const apiDummy = axios.create({
    baseURL: 'https://dummyjson.com',
})

// se pide la lista de categorias disponibles en DummyJSON.
export async function obtenerCategorias({ signal } = {}) {
    const respuesta = await apiDummy.get('/products/category-list', { signal })
    return respuesta.data
}

// aqui la funcion  pide los productos de la categoria selecionada y los trae a la vista
export async function obtenerProductos(categoria = 'todas', { signal } = {}) {
    const ruta =
        categoria === 'todas'
            ? '/products'
            : `/products/category/${encodeURIComponent(categoria)}`

    const respuesta = await apiDummy.get(ruta, {
        params: { limit: 24 },
        signal,
    })

    // dummyjson entrega los productos dentro de la propiedad "products".
    if (!Array.isArray(respuesta.data.products)) {
        throw new Error('La respuesta de productos no tiene el formato esperado.')
    }

    return respuesta.data.products
}