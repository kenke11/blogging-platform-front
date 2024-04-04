<template>
  <div class="mt-6">
    <label
      :for="id"
      class="block text-sm font-medium leading-6 text-gray-900"
      >{{ label }}</label
    >
    <div class="mt-2">
      <Field
        :id="id"
        :name="name"
        :type="type"
        :autocomplete="autocomplete"
        class="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        :class="{
          'bg-red-50': hasError,
        }"
        v-model="defaultValue"
        :rules="rules"
        :value="value"
      />
      <p class="h-3 py-1">
        <ErrorMessage :name="name" class="px-3 text-sm text-red-500" />
      </p>
    </div>
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import { ref, watch } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
    required: false,
  },
  autocomplete: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  rules: {
    type: String,
    default: "",
  },
  hasError: {
    type: Boolean,
    required: false,
    default: false,
  },
  value: {
    type: String,
    required: false,
    default: "",
  },
});

const defaultValue = ref(props.value);

watch(
  () => props.value,
  (newValue) => {
    defaultValue.value = newValue;
  },
);
</script>
