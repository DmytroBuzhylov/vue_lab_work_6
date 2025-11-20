import api from '../services/http';
import type { Author } from '../stores/blogStore';

export const authorApi = {
    async list(): Promise<Author[]> {
        const { data } = await api.get('/authors');
        return data;
    },
    async create(author: Omit<Author, 'id'>): Promise<Author> {
        const { data } = await api.post('/authors', author);
        return data;
    }
};
