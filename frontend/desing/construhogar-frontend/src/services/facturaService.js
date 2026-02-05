import axios from 'axios';

const API_URL = "http://localhost:8080/api/facturas";

export const realizarFacturacion = async (idPedido, medioPago) => {
    const data = {
        idPedido: parseInt(idPedido),
        medioPago: medioPago
    };
    const response = await axios.post(`${API_URL}/facturar`, data);
    return response.data;
};

// 🔥 NUEVA FUNCIÓN PARA EL DETALLE
export const obtenerFacturaPorId = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};