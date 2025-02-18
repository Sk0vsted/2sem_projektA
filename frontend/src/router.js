import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';  // Sørg for at stien er korrekt
import Register from './components/Register.vue';
import Home from './components/Home.vue';

const routes = [
    { path: '/', redirect: '/home' },  // Omdirigerer til login som standard
    { path: '/login', component: Login, meta: { title: 'Login' } },
    { path: '/register', component: Register, meta: { title: 'Register' }},
    { path: '/home', component: Home, meta: { title: 'Home' }}
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
