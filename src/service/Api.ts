import axios from 'axios';

const api = axios.create({
    baseURL: 'https://pirenopolis.local/api'
});

export default api;