<script setup>
import { ref, onMounted } from 'vue';

const userEmail = ref('');

onMounted(() => {
    userEmail.value = sessionStorage.getItem('email') || 'Du er ikke logget ind';
});
</script>

<template>
    <Navigation />
    <main class="flex flex-col justify-center items-center h-[calc(100vh-4.5rem)]">
        <h1 class="text-4xl font-bold">Welcome back</h1>
        <h1 class="text-4xl">{{ userEmail }}</h1>
    </main>
</template>