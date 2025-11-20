import axios from 'axios';
import { showToast } from './ToastService';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

api.interceptors.response.use(
    response => response,
    error => {
        const msg = error.response?.data?.message || 'Ошибка соединения с сервером';
        showToast(msg, 'error');
        return Promise.reject(error);
    }
);

export default api;