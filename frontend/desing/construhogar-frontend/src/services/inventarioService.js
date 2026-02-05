import axios from 'axios';

// URL base que apunta a tu controlador de Inventario en Java
const API_URL = "http://localhost:8080/api/inventarios";

export const inventarioService = {

  // 1. Obtener todo el inventario (útil para la tabla general)
  listarTodo: async () => {
    const res = await axios.get(API_URL);
    return res.data;
  },

  // 2. Consultar stock detallado por el ID del Material/Producto
  consultarPorProducto: async (idProducto) => {
    const res = await axios.get(`${API_URL}/producto/${idProducto}`);
    return res.data;
  },

  // 3. Registrar la entrada de stock (Sumar cantidades por ajuste o compra)
  registrarEntrada: async (idProducto, cantidad) => {
    const res = await axios.post(`${API_URL}/entrada`, {
      idProducto: parseInt(idProducto),
      cantidad: parseInt(cantidad)
    });
    return res.data;
  },

  // 4. 🔥 NUEVA FUNCIÓN: Registrar la salida de stock (Ajuste manual por error)
  // Envía el idProducto y la cantidad al nuevo endpoint de salida en el Backend
  registrarSalida: async (idProducto, cantidad) => {
    const res = await axios.post(`${API_URL}/salida`, {
      idProducto: parseInt(idProducto),
      cantidad: parseInt(cantidad)
    });
    return res.data;
  },

  // 5. Actualizar datos básicos (como cambiar la ubicación en bodega)
  actualizarInventario: async (idInventario, datos) => {
    const res = await axios.put(`${API_URL}/${idInventario}`, datos);
    return res.data;
  },

  // 6. Eliminar un registro de inventario
  eliminar: async (idInventario) => {
    await axios.delete(`${API_URL}/${idInventario}`);
  }
};