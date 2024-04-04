<template>
  <div class="lg:pt-32 px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
    <div class="mx-auto w-full flex flex-col space-y-10">
      <UserDataSection />
      <div v-if="user?.role === 'editor'">
        <UserNavigation />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserDataSection from "../components/user/UserDataSection.vue";
import UserNavigation from "../components/user/UserNavigation.vue";
import { useUserStore } from "../store/UserStore.js";
import { ref, watch } from "vue";
const userStore = useUserStore();

const user = ref(userStore.user);

watch(
  () => userStore.user,
  (newValue) => {
    user.value = newValue;
  },
);
</script>
