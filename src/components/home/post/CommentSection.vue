<template>
  <div class="max-h-56 overflow-y-auto">
    <div
      v-for="comment in comments"
      :key="comment"
      class="py-3 border-t border-b flex justify-between items-start px-4"
    >
      <div>
        <div class="mb-1 font-semibold">{{ comment?.user?.name }}</div>
        <div>
          {{ comment?.comment }}
        </div>
      </div>

      <div>
        <button
          v-if="isAdmin || user?.id === comment.user.id"
          @click="deleteComment(comment.id)"
          type="button"
          class="border rounded-md p-2 bg-red-100 hover:bg-red-200"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCommentStore } from "@/store/CommentStore.js";
import { onMounted, ref, watch } from "vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";

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
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

const commentStore = useCommentStore();
const comments = ref(commentStore.comments);

const deleteComment = (commentId) => {
  commentStore.commentDestroy(commentId, props.post.id);
};

onMounted(() => {
  commentStore.fetchComments(props.post.id);
});

watch(
  () => commentStore.comments,
  (newValue) => {
    comments.value = newValue;
  },
);
</script>
