<template>
  <MainHeader />
  <router-view></router-view>
</template>

<script setup>
import { onBeforeMount } from "vue";
import MainHeader from "@/components/header/MainHeader.vue";
import { useUserStore } from "@/store/UserStore.js";
import { useAuthStore } from "@/store/AuthStore.js";

const userStore = useUserStore();
const authStore = useAuthStore();

onBeforeMount(() => {
  const token = localStorage.getItem("driver_token") ?? authStore.isAuth;

  if (token) {
    userStore.fetchUser(token);
  }
});
</script>
