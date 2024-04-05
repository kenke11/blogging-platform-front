<template>
  <div class="w-full border border-gray-300 rounded-lg px-5 py-4 bg-gray-100">
    <div>
      <ul class="flex flex-col space-y-4">
        <li class="flex items-center">
          <div class="w-16">Name:</div>
          <span>{{ user?.name }}</span>
        </li>
        <li class="flex items-center">
          <div class="w-16">Email:</div>
          <span>{{ user?.email }}</span>
        </li>
        <li class="flex items-center">
          <div class="w-16">Role:</div>
          <div
            class="rounded-md px-3 py-0.5 border border-green-300 text-sm bg-green-100 font-semibold"
          >
            {{ user?.role }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/store/UserStore.js";
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
