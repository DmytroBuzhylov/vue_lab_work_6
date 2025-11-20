import api from '../services/http';

export const userApi = {
    async login(login: string, password: string): Promise<boolean> {
        const { data } = await api.post('/login', { login, password });
        return data.success;
    },

    async logout(login: string): Promise<void> {
        await api.post('/logout', { login });
    }
};