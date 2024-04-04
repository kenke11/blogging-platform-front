<template>
  <div class="flex flex-row md:flex-row space-y-5 md:space-y-0 md:space-x-10">
    <router-link
      :to="{ name: 'user-posts' }"
      class="py-2 px-3 border rounded-md bg-gray-100"
      :class="{ 'bg-indigo-200': $route.name === 'user-posts' }"
      >My Posts</router-link
    >
    <router-link
      :to="{ name: 'create-post' }"
      class="py-2 px-3 border rounded-md bg-gray-100"
      :class="{ 'bg-indigo-200': $route.name === 'create-post' }"
      >Create New Post</router-link
    >
  </div>
</template>

<script setup></script>
