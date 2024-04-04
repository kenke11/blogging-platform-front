<template>
  <div>
    <Form
      @submit="onSubmit"
      v-slot="{ errors }"
      method="POST"
      class="space-y-6"
    >
      <div class="mt-10">
        <InputField
          id="title"
          label="Title"
          autocomplete="title"
          name="title"
          type="text"
          :hasError="!!errors.title"
          rules="required"
        />

        <div class="mt-6">
          <Field name="body" v-slot="{ field }" rules="required">
            <label
              for="body"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Body</label
            >
            <textarea
              v-bind="field"
              class="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              :class="{
                'bg-red-50': errors.body,
              }"
            ></textarea>
          </Field>
          <p class="h-3 py-1">
            <ErrorMessage name="body" class="px-3 text-sm text-red-500" />
          </p>
        </div>
      </div>

      <div class="mt-4">
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create post
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { Field, Form } from "vee-validate";
import InputField from "../../ui/inputs/InputField.vue";
import { usePostStore } from "../../../store/PostStore.js";

const postStore = usePostStore();

const onSubmit = (values) => {
  console.log(values);
  postStore.postStore(values);
};
</script>
