import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7138/' 
});

export default api;