import axios from "axios";

const API_URL = "http://localhost:8080/api/pedidos";

export const pedidoService = {
  obtenerTodos: async () => {
    const res = await axios.get(API_URL);
    return res.data;
  },

  obtenerPorId: async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  },

  crear: async (pedido) => {
    const res = await axios.post(API_URL, pedido);
    return res.data;
  },

  actualizar: async (id, pedido) => {
    // 🔥 IMPORTANTE: El backend espera el ID en la URL para el @PutMapping("/{id}")
    const res = await axios.put(`${API_URL}/${id}`, pedido);
    return res.data;
  },

  eliminar: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  }
};