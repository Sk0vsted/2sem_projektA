import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';  // Sørg for at stien er korrekt
import Register from './components/Register.vue';

const routes = [
    { path: '/', redirect: '/login' },  // Omdirigerer til login som standard
    { path: '/login', component: Login },
    { path: '/register', component: Register }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
