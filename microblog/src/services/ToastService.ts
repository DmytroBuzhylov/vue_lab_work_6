import { reactive } from 'vue';

interface Toast {
    id: number;
    message: string;
    type: 'info' | 'error' | 'success';
}

export const toasts = reactive<Toast[]>([]);

export const showToast = (message: string, type: 'info' | 'error' | 'success' = 'info') => {
    const id = Date.now();
    toasts.push({ id, message, type });
    setTimeout(() => {
        const idx = toasts.findIndex(t => t.id === id);
        if (idx !== -1) toasts.splice(idx, 1);
    }, 3000);
};