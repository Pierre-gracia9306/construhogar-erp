import axios from 'axios';

const API_URL = "http://localhost:8080/api/productos";
const PROV_URL = "http://localhost:8080/api/proveedores";

export const materialService = {
  
  // 1. Listar todos los materiales (productos en el backend)
  listarMateriales: async () => {
    const res = await axios.get(API_URL);
    return res.data;
  },

  // 🔥 NUEVO MÉTODO: Obtener un material por su ID
  // Vital para que al añadir productos al pedido, traigamos nombre y precio real
  obtenerPorId: async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  },

  // 2. Crear un nuevo material
  crearMaterial: async (material) => {
    const res = await axios.post(API_URL, material);
    return res.data;
  },

  // 3. Buscar proveedor para validación previa
  buscarProveedor: async (tipo, numero) => {
    const res = await axios.get(`${PROV_URL}/buscar`, {
      params: { tipo, numero }
    });
    return res.data;
  },

  // 4. Eliminar material por ID
  eliminarMaterial: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  }
};