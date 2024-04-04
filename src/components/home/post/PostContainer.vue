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
          <div class="font-bold">{{ post.title }}</div>
          <p>
            {{ post.body }}
          </p>
          <div class="flex items-center justify-between">
            <div>
              <div class="font-semibold">{{ post.user.name }}</div>
              <div class="text-sm">{{ post.views_count }} views</div>
              <div class="text-sm text-gray-600">{{ post.created_at }}</div>
            </div>
            <div class="flex items-center space-x-2">
              <button
                class="border rounded-md p-2 bg-gray-100 hover:bg-gray-200"
              >
                <ViewIcon />
              </button>
              <button
                v-if="user?.id === post.user.id"
                class="border rounded-md p-2 bg-blue-100 hover:bg-blue-200"
              >
                <EditIcon />
              </button>
              <button
                v-if="isAdmin || user?.id === post.user.id"
                class="border rounded-md p-2 bg-red-100 hover:bg-red-200"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>
        <div class="px-8 py-6 border-t">
          <div v-if="isAuth">
            <Form class="flex items-end justify-between space-x-3">
              <InputField
                id="comment"
                label="Add Comment"
                name="comment"
                autocomplete="comment"
                class="w-full"
              />
              <button
                type="button"
                class="text-nowrap px-4 py-2 border rounded-md mb-2 bg-blue-100"
              >
                Add comment
              </button>
            </Form>
          </div>
          <CommentSection />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import EditIcon from "../../icons/EditIcon.vue";
import DeleteIcon from "../../icons/DeleteIcon.vue";
import ViewIcon from "../../icons/ViewIcon.vue";
import InputField from "../../ui/inputs/InputField.vue";
import CommentSection from "./CommentSection.vue";
import { useAuthStore } from "../../../store/AuthStore.js";
import { computed } from "vue";
import XIcon from "../../icons/XIcon.vue";

const authStore = useAuthStore();

const isAuth = computed(() => authStore.isAuth);

defineProps({
  post: {
    type: Object,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  user: {
    type: Object,
    required: false,
    default: null,
  },
});

const emit = defineEmits(["closePostPopup"]);

const closePostPopup = () => {
  emit("closePostPopup");
};
</script>
