import { create } from 'zustand'

export const useCarritoStore = create((set) => ({
  // Lista compartida de productos; cada producto guarda su cantidad
  productos: [],

  // Agrega una unidad o aumenta la cantidad si ya estaba en la canasta
  agregarProducto: (nuevoProducto) =>
    set((state) => {
      const yaExiste = state.productos.some(
        (producto) => producto.id === nuevoProducto.id,
      )

      return {
        productos: yaExiste
          ? state.productos.map((producto) =>
              producto.id === nuevoProducto.id
                ? { ...producto, cantidad: (producto.cantidad ?? 1) + 1 }
                : producto,
            )
          : [...state.productos, { ...nuevoProducto, cantidad: 1 }],
      }
    }),

  // se suma una unidad al producto elegido
  sumarUnidad: (id) =>
    set((state) => ({
      productos: state.productos.map((producto) =>
        producto.id === id
          ? { ...producto, cantidad: (producto.cantidad ?? 1) + 1 }
          : producto,
      ),
    })),

  // se resta una unidad; si llega a cero, lo quita de la canasta.
  restarUnidad: (id) =>
    set((state) => ({
      productos: state.productos
        .map((producto) =>
          producto.id === id
            ? { ...producto, cantidad: (producto.cantidad ?? 1) - 1 }
            : producto,
        )
        .filter((producto) => producto.cantidad > 0),
    })),

  // Quita de una vez el producto elegido, sin importar su cantidad
  eliminarProducto: (id) =>
    set((state) => ({
      productos: state.productos.filter((producto) => producto.id !== id),
    })),

  // Deja la canasta vacía
  vaciarCarrito: () => set({ productos: [] }),
}))