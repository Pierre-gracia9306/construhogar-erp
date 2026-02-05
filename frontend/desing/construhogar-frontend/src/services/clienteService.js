import axios from "axios";

const API_URL = "http://localhost:8080/api/clientes";

const clienteService = {
  // 1. Obtener todos los clientes (Listado general)
  obtenerTodos: async () => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error) {
      console.error("Error en obtenerTodos:", error);
      throw error;
    }
  },

  // 2. Obtener por ID técnico (id_cliente de la DB)
  obtenerPorId: async (id) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error en obtenerPorId:", error);
      throw error;
    }
  },

  /**
   * 🔍 3. BUSCAR POR DOCUMENTO (Cédula o NIT)
   * He renombrado la función a 'consultarPorDocumento' para que 
   * coincida con lo que usted escribió en su componente JSX.
   */
  consultarPorDocumento: async (documento) => {
    try {
      // Ojo: Verifique en su Controller si es /buscar/{documento} o /buscar?numero=...
      const res = await axios.get(`${API_URL}/buscar/${documento}`);
      return res.data;
    } catch (error) {
      console.error("Error en consultarPorDocumento:", error);
      throw error;
    }
  },

  // 4. Crear un nuevo cliente
  crear: async (cliente) => {
    try {
      const res = await axios.post(API_URL, cliente);
      return res.data;
    } catch (error) {
      console.error("Error al crear cliente:", error);
      throw error;
    }
  },

  // 5. Actualizar datos de un cliente existente
  actualizar: async (id, cliente) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, cliente);
      return res.data;
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
      throw error;
    }
  },

  // 6. Eliminar cliente
  eliminar: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      throw error;
    }
  }
};

// 🔥 IMPORTANTE: Exportación por defecto para evitar errores de llaves {}
export default clienteService;