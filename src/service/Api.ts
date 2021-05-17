import axios from 'axios';

const api = axios.create({
    baseURL: globalThis.host
});

export default api;