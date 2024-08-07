import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5158/api/',  // Asegúrate de que esta URL sea correcta
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
