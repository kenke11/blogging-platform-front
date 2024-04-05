<template>
  <div
    class="fixed top-0 bottom-0 right-0 left-0 z-50 flex items-center justify-center"
  >
    <div
      @click="closePostPopup"
      class="absolute top-0 bottom-0 right-0 left-0 bg-gray-900 z-20 opacity-45"
    ></div>
    <div
      class="absolute bg-white border rounded-md z-30 w-full md:w-[80%] flex flex-col h-screen md:h-fit md:max-h-[80%]"
    >
      <div class="relative">
        <div class="absolute top-3 right-3">
          <button
            @click="closePostPopup"
            type="button"
            class="p-2 hover:bg-gray-100 rounded-md"
          >
            <XIcon />
          </button>
        </div>
        <div class="px-8 py-6 flex flex-col space-y-5">
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
                :value="post.title"
              />

              <div class="mt-6">
                <Field
                  name="body"
                  :value="post.body"
                  v-slot="{ field }"
                  rules="required"
                >
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
                  >
                  </textarea>
                </Field>
                <p class="h-3 py-1">
                  <ErrorMessage name="body" class="px-3 text-sm text-red-500" />
                </p>
              </div>
              <InputField
                id="published_date"
                label="Published date"
                autocomplete="published_date"
                name="published_date"
                type="date"
                :hasError="!!errors.created_at"
                rules="required"
                :value="post.published_date"
              />
            </div>

            <div class="mt-4">
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Edit post
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Field, Form } from "vee-validate";
import { usePostStore } from "@/store/PostStore.js";
import InputField from "@/components/ui/inputs/InputField.vue";
import XIcon from "@/components/icons/XIcon.vue";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  user: {
    type: Object,
    required: false,
    default: null,
  },
});

const emit = defineEmits(["closePostEditPopup"]);

const postStore = usePostStore();

const closePostPopup = () => {
  emit("closePostEditPopup");
};

const onSubmit = (values) => {
  postStore.postEdit(values, props.post.id);
  closePostPopup();
};
</script>
