import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_IMPACTO_BARBEARIA_BACKEND_URL
});

export default api;