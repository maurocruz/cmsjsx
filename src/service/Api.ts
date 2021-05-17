import axios from 'axios';

const api = axios.create({
    baseURL: globalThis.apiHost
});

export default api;