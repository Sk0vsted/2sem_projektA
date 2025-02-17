<script setup>
import { ref } from 'vue';

const pword = ref('');
const mail = ref('');
const message = ref('');
const messageClass = ref('');

const loginUser = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: mail.value, password: pword.value })
        });

        const data = await response.json(); // Læs backendens svar

        if (!response.ok) { // Læs fejl fra backend
            throw new Error(data.error || "❌ Forkert email eller password");
        }

        messageClass.value = "text-green-500";
        message.value = data.message; // Succesbesked fra backend

        mail.value = "";
        pword.value = "";

    } catch (error) {
        console.error("Error sending data:", error);
        messageClass.value = "text-red-500";
        message.value = error.message; // Brug backendens fejlbesked
        pword.value = "";
    }
};
</script>

<template>
    <div class="flex justify-center items-center h-screen bg-gray-200">
        <div class="bg-white p-8 rounded shadow-md w-96">
            <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
            <form @submit.prevent="loginUser"> <!-- ✅ Korrekt event -->
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" v-model="mail" id="email" name="email"
                        class="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-indigo-500"
                        required>
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input type="password" v-model="pword" id="password" name="password"
                        class="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-indigo-500"
                        required>
                </div>
                <button type="submit"
                    class="w-full bg-indigo-500 hover:bg-indigo-700 transition-all duration-150 ease-in-out hover:cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Login
                </button>
            </form>
            <p v-if="message" :class="[messageClass]" class="mt-4 text-center">{{ message }}</p>
        </div>
    </div>
</template>
