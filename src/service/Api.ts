import axios from 'axios';

const api = axios.create({
    baseURL: globalThis.hostApi
});

export default api;