<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const pword = ref('');
const mail = ref('');
const message = ref('');
const messageClass = ref('');
const router = useRouter();

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

        setTimeout(() => {
            router.push('/login');
        }, 500);

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
    <div class="flex justify-center items-center bg-white h-[calc(100vh-4.5rem)]">
        <div class="w-full flex justify-start h-full bg-[url(../public/bg2.jpg)] bg-cover">
            <div class="login pl-16 pr-32 bg-white flex flex-col justify-center">
                <div class="pb-4 text">
                    <h1 class="text-4xl font-bold mb-6 text-left select-none">New here?</h1>
                    <p class="text-gray-700">Don't worry! I've got you covered!</p>
                    <p class="text-gray-700">Just <strong>register</strong> using the form below, and you're all set!
                    </p>
                </div>
                <form @submit.prevent="registerUser">
                    <div class="mb-4">
                        <label for="email" class="block text-gray-700 text-sm font-bold mb-2 select-none">Email</label>
                        <input type="email" v-model="mail" id="email" name="email" placeholder="Email"
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
                    <button type=" submit"
                        class="w-full bg-indigo-500 hover:bg-indigo-700 transition-all duration-150 ease-in-out hover:cursor-pointer text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline">
                        Register
                    </button>
                </form>
                <p v-if="message" :class="[messageClass]" class="mt-4 text-center message">{{ message }}</p>
            </div>
        </div>
    </div>
</template>
