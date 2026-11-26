import { create } from 'zustand'

// Estado inicial que usa el encabezado para mostrar cero unidades.
// Las acciones de la canasta se agregaran en su requerimiento.
export const useCarritoStore = create(() => ({
  productos: [],
}))