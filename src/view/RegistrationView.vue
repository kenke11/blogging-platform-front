<template>
  <div class="flex min-h-screen flex-1 pt-24 md:pt-0">
    <div
      class="flex flex-1 flex-col lg:justify-start lg:pt-32 justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 lg:w-1/2"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img
            class="h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2
            class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900"
          >
            Lorem ipsum dolor sit amet.
          </h2>
        </div>

        <RegistrationSection />

        <div class="mt-10">
          <p class="text-center text-sm leading-6 text-gray-500">
            Already have account?
            {{ " " }}
            <router-link
              :to="{ name: 'login' }"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
              >Login</router-link
            >
          </p>
        </div>
      </div>
    </div>
    <ImageSection />
  </div>
</template>

<script setup>
import ImageSection from "../components/auth/ImageSection.vue";
import RegistrationSection from "../components/auth/RegistrationSection.vue";
</script>
