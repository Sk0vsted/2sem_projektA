<script setup>
import { ref } from 'vue';

const pword = ref('');
const mail = ref('');
const message = ref('');
const messageClass = ref('');

const registerUser = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/registerUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: mail.value, password: pword.value })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Registration failed");
        }

        messageClass.value = "text-green-500";
        message.value = data.message;

        mail.value = "";
        pword.value = "";

    } catch (error) {
        console.error("Error sending data:", error);
        messageClass.value = "text-red-500";
        message.value = "❌ " + error.message;
        pword.value = "";
        mail.value = "";
    }
};
</script>

<template>
    <Navigation />
    <div class="flex justify-center items-center h-screen bg-gray-200">
        <div class="bg-white p-8 rounded shadow-md w-96">
            <h1 class="text-2xl font-bold mb-6 text-left select-none">Register</h1>
            <form @submit.prevent="registerUser">
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2 select-none">Email</label>
                    <input type="email" v-model="mail" id="email" name="email"
                        class="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-indigo-500"
                        required>
                </div>
                <div class="mb-6">
                    <label for="password"
                        class="block text-gray-700 text-sm font-bold mb-2 select-none">Password</label>
                    <input type="password" v-model="pword" id="password" name="password"
                        class="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-indigo-500"
                        required>
                </div>
                <button type="submit"
                    class="w-full bg-indigo-500 hover:bg-indigo-700 transition-all duration-150 ease-in-out hover:cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Register
                </button>
            </form>
            <p v-if="message" :class="[messageClass]" class="mt-4 text-center message">{{ message }}</p>
        </div>
    </div>
</template>
