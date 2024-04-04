<template>
  <header class="bg-white border-b border-gray-200 w-full fixed z-40">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <router-link :to="{ name: 'home' }" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img
            class="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          />
        </router-link>
      </div>
      <div class="flex lg:hidden">
        <Locale />

        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 ml-3"
          @click="mobileMenuToggle()"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <div class="flex lg:gap-x-12">
        <div v-if="isAuth" class="flex flex-1 items-center justify-end gap-x-8">
          <router-link
            :to="{ name: 'user' }"
            class="-m-1.5 p-1.5 flex flex-col items-center justify-center border rounded-md hover:bg-gray-100"
          >
            <span>{{ user?.name }}</span>
            <span
              class="text-sm px-1 py-0.5 rounded-md border border-green-300 bg-green-100"
              >{{ user?.role }}</span
            >
          </router-link>
        </div>
        <div v-else class="flex flex-1 items-center justify-end gap-x-8">
          <router-link :to="{ name: 'login' }" class="-m-1.5 p-1.5">
            Login
          </router-link>
          <router-link :to="{ name: 'signup' }" class="-m-1.5 p-1.5">
            Signup
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useAuthStore } from "../../store/AuthStore.js";
import { ref, watch } from "vue";
import { useUserStore } from "../../store/UserStore.js";

const authStore = useAuthStore();
const userStore = useUserStore();

const isAuth = ref(authStore.isAuth);
const user = ref(userStore.user);

watch(
  () => authStore.isAuth,
  (newValue) => {
    isAuth.value = newValue;
  },
);

watch(
  () => userStore.user,
  (newValue) => {
    user.value = newValue;
  },
);
</script>
