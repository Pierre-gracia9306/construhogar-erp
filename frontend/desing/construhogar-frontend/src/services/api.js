import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // La dirección de tu servidor Java
});

export default api;