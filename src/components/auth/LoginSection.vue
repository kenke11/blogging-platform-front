<template>
  <div class="mt-10">
    <div>
      <Form
        @submit="onSubmit"
        v-slot="{ errors }"
        method="POST"
        class="space-y-6"
      >
        <div class="mt-10">
          <InputField
            id="email"
            label="Email"
            autocomplete="email"
            name="email"
            type="email"
            :hasError="!!errors.email"
            rules="required|email"
          />

          <InputField
            id="password"
            label="Password"
            autocomplete="current-password"
            name="password"
            type="password"
            :hasError="!!errors.password"
            rules="required|min:8"
          />
        </div>

        <div class="mt-4">
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            login
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import InputField from "../ui/inputs/InputField.vue";

const onSubmit = (values) => {
  console.log(values);
};
</script>
