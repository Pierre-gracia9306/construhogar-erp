import axios from "axios";

const API_URL = "http://localhost:8080/api/proveedores";

const proveedorService = {
  // 1. Crear un nuevo proveedor
  crearProveedor: async (proveedor) => {
    try {
      const response = await axios.post(API_URL, proveedor);
      return response.data;
    } catch (error) {
      console.error("Error en proveedorService.crearProveedor:", error);
      throw error;
    }
  },

  // 2. Obtener todos los proveedores
  obtenerProveedores: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error en proveedorService.obtenerProveedores:", error);
      throw error;
    }
  },

  // 3. BUSCAR POR DOCUMENTO
  buscarPorDocumento: async (tipo, numero) => {
    try {
      const response = await axios.get(`${API_URL}/buscar`, {
        params: { tipo, numero }
      });
      return response.data;
    } catch (error) {
      console.error("Error en proveedorService.buscarPorDocumento:", error);
      throw error;
    }
  },

  // 4. OBTENER POR ID
  obtenerPorId: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error en proveedorService.obtenerPorId:", error);
      throw error;
    }
  },

  // 5. ACTUALIZAR (Corregido sin variables sin usar)
  actualizarProveedor: async (id, proveedor) => {
    try {
      // Usamos axios.put porque en tu Controller Java tienes @PutMapping
      const response = await axios.put(`${API_URL}/${id}`, proveedor);
      return response.data;
    } catch (error) {
      console.error("Error en proveedorService.actualizarProveedor:", error);
      throw error;
    }
  }
};

export default proveedorService;