import { create } from 'zustand'

// Usa el origen y el id para distinguir productos de APIs diferentes.
const obtenerClaveProducto = (producto) =>
  producto.claveCarrito ?? `${producto.origen ?? 'producto'}-${producto.id}`

export const useCarritoStore = create((set) => ({
  // Lista compartida de productos; cada producto guarda su cantidad
  productos: [],

  // Agrega una unidad o aumenta la cantidad si ya estaba en la canasta
  agregarProducto: (nuevoProducto) =>
    set((state) => {
      const claveNuevoProducto = obtenerClaveProducto(nuevoProducto)
      const yaExiste = state.productos.some(
        (producto) => obtenerClaveProducto(producto) === claveNuevoProducto,
      )

      return {
        productos: yaExiste
          ? state.productos.map((producto) =>
              obtenerClaveProducto(producto) === claveNuevoProducto
                ? { ...producto, cantidad: (producto.cantidad ?? 1) + 1 }
                : producto,
            )
          : [
              ...state.productos,
              {
                ...nuevoProducto,
                claveCarrito: claveNuevoProducto,
                cantidad: 1,
              },
            ],
      }
    }),

  // Se suma una unidad al producto elegido.
  sumarUnidad: (claveCarrito) =>
    set((state) => ({
      productos: state.productos.map((producto) =>
        obtenerClaveProducto(producto) === claveCarrito
          ? { ...producto, cantidad: (producto.cantidad ?? 1) + 1 }
          : producto,
      ),
    })),

  // se resta una unidad; si llega a cero, lo quita de la canasta.
  restarUnidad: (claveCarrito) =>
    set((state) => ({
      productos: state.productos
        .map((producto) =>
          obtenerClaveProducto(producto) === claveCarrito
            ? { ...producto, cantidad: (producto.cantidad ?? 1) - 1 }
            : producto,
        )
        .filter((producto) => producto.cantidad > 0),
    })),

  // Quita de una vez el producto elegido, sin importar su cantidad
  eliminarProducto: (claveCarrito) =>
    set((state) => ({
      productos: state.productos.filter(
        (producto) => obtenerClaveProducto(producto) !== claveCarrito,
      ),
    })),

  // Deja la canasta vacía
  vaciarCarrito: () => set({ productos: [] }),
}))