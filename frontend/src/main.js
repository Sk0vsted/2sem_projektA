import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Navigation from './components/Navigation.vue'


const app = createApp(App);
app.component('Navigation', Navigation);
app.use(router);
app.mount('#app');
