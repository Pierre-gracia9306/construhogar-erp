import axios from 'axios';

const API_URL = "http://localhost:8080/api";

export const FormularioComprasService = {
  // Nueva lógica: Busca al proveedor por tipo y número de documento
  validarDatosCompra: async (tipoDoc, numDoc, idProducto) => {
    // 1. Buscamos al proveedor por documento
    const resProv = await axios.get(`${API_URL}/proveedores/buscar`, {
      params: { tipo: tipoDoc, numero: numDoc }
    });
    
    // 2. Buscamos el producto por su ID (este sigue igual por ahora)
    const resProd = await axios.get(`${API_URL}/productos/${idProducto}`);
    
    return { 
      proveedor: resProv.data, // Aquí vendrá el objeto con el idProveedor real
      producto: resProd.data 
    };
  },

  crearCompra: async (datos) => {
    const res = await axios.post(`${API_URL}/compras`, datos);
    return res.data;
  }
};