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
              <div class="text-sm text-gray-600">{{ post.published_date }}</div>
            </div>
            <div class="flex items-center space-x-2">
              <button
                v-if="isAdmin || user?.id === post.user.id"
                @click="deletePost"
                class="border rounded-md p-2 bg-red-100 hover:bg-red-200"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>
        <div class="px-8 py-6 border-t">
          <div v-if="isAuth">
            <Form
              @submit="commentOnSubmit"
              v-slot="{ errors }"
              method="POST"
              class="flex items-end justify-between space-x-3"
            >
              <InputField
                id="comment"
                label="Add Comment"
                autocomplete="comment"
                name="comment"
                type="text"
                :hasError="!!errors.comment"
                rules="required"
                class="w-full mb-6"
              />
              <button
                type="submit"
                class="text-nowrap px-4 py-2 border rounded-md mb-8 bg-blue-100"
              >
                Add comment
              </button>
            </Form>
          </div>
          <CommentSection :post="post" :isAdmin="isAdmin" :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/AuthStore.js";
import { computed, onMounted } from "vue";
import { usePostStore } from "@/store/PostStore.js";
import { useCommentStore } from "@/store/CommentStore.js";
import { Form } from "vee-validate";
import CommentSection from "@/components/home/post/CommentSection.vue";
import InputField from "@/components/ui/inputs/InputField.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import XIcon from "@/components/icons/XIcon.vue";

const authStore = useAuthStore();
const postStore = usePostStore();

const isAuth = computed(() => authStore.isAuth);

const props = defineProps({
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

const commentStore = useCommentStore();

const closePostPopup = () => {
  emit("closePostPopup");
};

const deletePost = () => {
  postStore.postDestroy(props.post.id);
  closePostPopup();
};

const commentOnSubmit = (values) => {
  commentStore.commentStore(values, props.post.id);
};

onMounted(() => {
  if (isAuth.value) {
    postStore.postViewed(props.post.id);
  }
});
</script>
