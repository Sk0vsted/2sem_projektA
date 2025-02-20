<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const userEmail = ref('');
const router = useRouter();

onMounted(() => {
    userEmail.value = sessionStorage.getItem('email');
});

const logout = () => {
    sessionStorage.removeItem('email');
    userEmail.value = '';
    router.push('/login');
};
</script>

<template>
    <nav class="flex h-[4.5rem] bg-white text-center items-center justify-between drop-shadow-lg px-16">
        <h1 class="font-bold text-2xl flex">2. SEM&nbsp;|&nbsp;<h1 class="font-normal">Excercise 2</h1>
        </h1>
        <div class="links">
            <span v-if="userEmail">{{ userEmail }}</span>
            <router-link v-if="!userEmail" to="/login" class="mx-6 no-underline text-black font-bold"
                active-class="text-indigo-600">Login</router-link>
            <router-link v-if="!userEmail" to="/register" class="mx-6 no-underline text-black font-bold"
                active-class="text-indigo-600">Register</router-link>
            <button v-if="userEmail" @click="logout" class="mx-6 no-underline text-black font-bold">Logout</button>
        </div>
    </nav>
</template>