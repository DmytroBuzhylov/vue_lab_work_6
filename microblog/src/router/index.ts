import { createRouter, createWebHistory } from 'vue-router';
import FeedView from '../views/FeedView.vue';
import AuthorProfileView from '../views/AuthorProfileView.vue';
import CreatePostView from '../views/CreatePostView.vue';
import CreateAuthorView from '../views/CreateAuthorView.vue';
import LoginView from '../views/LoginView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: FeedView },
        { path: '/author/:id', component: AuthorProfileView },
        { path: '/login', component: LoginView },

        {
            path: '/admin/create-post',
            component: CreatePostView,
            meta: { requiresAuth: true }
        },
        {
            path: '/admin/create-author',
            component: CreateAuthorView,
            meta: { requiresAuth: true }
        },
    ]
});

router.beforeEach((to, _from, next) => {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;