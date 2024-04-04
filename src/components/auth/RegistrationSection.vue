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
            id="name"
            label="Name"
            autocomplete="name"
            name="name"
            type="text"
            :hasError="!!errors.name"
            rules="required"
          />

          <div class="mt-4">
            <label
              for="role"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Role</label
            >
            <div class="mt-2">
              <Field
                id="role"
                name="role"
                as="select"
                autocomplete="role"
                class="block w-full rounded-md border-0 py-3 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                :class="{
                  'bg-red-50': errors.role,
                }"
                rules="required"
              >
                <option value="" disabled>Choose role</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="user">User</option>
              </Field>
              <p class="h-3 py-1">
                <ErrorMessage name="role" class="px-3 text-sm text-red-500" />
              </p>
            </div>
          </div>

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

          <InputField
            id="confirm_password"
            label="Confirm password"
            autocomplete="new-password"
            name="confirm_password"
            type="password"
            :hasError="!!errors.confirm_password"
            rules="required|confirmed:password"
          />
        </div>

        <div class="mt-4">
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sing up
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form, Field } from "vee-validate";
import InputField from "../ui/inputs/InputField.vue";
import { useAuthStore } from "../../store/AuthStore.js";

const authStore = useAuthStore();

const onSubmit = (values) => {
  authStore.signup(values);
};
</script>
