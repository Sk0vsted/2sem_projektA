<template>
  <div>
    <nav class="p-2 bg-white text-center">
      <router-link to="/login" class="mx-12 no-underline text-black font-bold"
        active-class="text-indigo-600">Login</router-link>
      <router-link to="/register" class="mx-12 no-underline text-black font-bold"
        active-class="text-indigo-600">Register</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>
