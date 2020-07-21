import axios from 'axios';

const host = window.location.hostname;

const api = axios.create({
    baseURL: `https://${host}/api`
});

export default api;