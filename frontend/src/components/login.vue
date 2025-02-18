<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const pword = ref('');
const mail = ref('');
const message = ref('');
const messageClass = ref('');

const router = useRouter();

const loginUser = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: mail.value, password: pword.value })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "❌ Forkert email eller password");
        }

        messageClass.value = "text-green-500";
        message.value = data.message;

        mail.value = "";
        pword.value = "";

        router.push('/home');

    } catch (error) {
        console.error("Error sending data:", error);
        messageClass.value = "text-red-500";
        message.value = error.message;
        pword.value = "";
    }
};
</script>

<template>
    <Navigation />
    <main class="flex w-full justify-center items-center h-[calc(100vh-4.5rem)]">
        <div class="introduction w-3/5 bg-[url(../public/bg.jpg)] bg-cover h-full">
            <h1 class="text-3xl text-white italic pr-64 pl-16 pt-42">
                If a program is designed to think, but only within the boundaries of its code, is it truly intelligent — or just a prisoner of logic, unaware of the world beyond its loops and algorithms?
            </h1>
        </div>
        <div class="flex justify-center px-auto bg-white w-2/5 h-full items-center">
            <div class="flex-col w-128">
            <div class="py-4 px-8 text">
                <h1 class="text-4xl font-bold mb-6 text-left select-none">Welcome back!</h1>
                <p class="text-gray-700">Don't have an account? <router-link to="/register" class="text-indigo-500 hover:underline font-bold">Create a new account here!</router-link></p>
                <p class="text-gray-700">It's completely free and takes less than a minute!</p>
            </div>
            <div class="py-4 px-8 rounded w-full">
                <form @submit.prevent="loginUser">
                    <div class="mb-4">
                        <label for="email" class="block text-gray-700 text-sm font-bold mb-2 select-none">Email</label>
                        <input type="email" v-model="mail" id="email" name="email" placeholder="E-mail"
                            class="w-full px-3 py-2 border border-gray-300 rounded transition-all duration-200 ease-in-out focus:outline-none focus:border-indigo-500 border-t-0 border-r-0 border-l-0 border-b-3 focus:bg-linear-to-t focus:from-gray-100 focus:to-white"
                            required>
                    </div>
                    <div class="mb-6">
                        <label for="password"
                            class="block text-gray-700 text-sm font-bold mb-2 select-none">Password</label>
                        <input type="password" v-model="pword" id="password" name="password" placeholder="Password"
                            class="w-full px-3 py-2 border border-gray-300 rounded transition-all duration-200 ease-in-out focus:outline-none focus:border-indigo-500 border-t-0 border-r-0 border-l-0 border-b-3 focus:bg-linear-to-t focus:from-gray-100 focus:to-white"
                            required>
                    </div>
                    <button type="submit"
                        class="w-full bg-indigo-500 hover:bg-indigo-700 transition-all duration-150 ease-in-out hover:cursor-pointer text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline">
                        Login Now
                    </button>
                    <p v-if="message" :class="[messageClass]" class="mt-4 text-left">{{ message }}</p>
                </form>
            </div>
        </div>
        </div>
    </main>
</template>