import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Home from './components/Home.vue';

const routes = [
    { path: '/', redirect: '/login', meta: { title: '2. SEM | Excercise 2 - Login' } },
    { path: '/login', component: Login, meta: { title: '2. SEM | Excercise 2 - Login' } },
    { path: '/register', component: Register, meta: { title: '2. SEM | Excercise 2 - Register' } },
    { path: '/home', component: Home, meta: { title: '2. SEM | Excercise 2 - Home' } }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Default title';
    next();
});

export default router;
