import { ref } from 'vue';
import { authorApi } from '../api/authorApi';
import { useBlogStore } from '../stores/blogStore';

export function useAuthors() {
    const isLoading = ref(false);
    const store = useBlogStore();

    const fetchAuthors = async () => {
        isLoading.value = true;
        try {
            const authors = await authorApi.list();
            store.setAuthors(authors);
        } finally {
            isLoading.value = false;
        }
    };

    const createAuthor = async (name: string, avatar: string) => {
        isLoading.value = true;
        try {
            const newAuthor = await authorApi.create({ name, avatar } as any);
            store.addAuthor(newAuthor);
            return newAuthor.id;
        } finally {
            isLoading.value = false;
        }
    };

    return { isLoading, fetchAuthors, createAuthor };
}