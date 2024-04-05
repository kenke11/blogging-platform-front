<template>
  <div class="max-h-56 overflow-y-auto">
    <div
      v-for="comment in comments"
      :key="comment"
      class="py-3 border-t border-b flex justify-between items-start px-4"
    >
      <div>
        <div>{{ comment?.user?.name }}</div>
        <div>
          {{ comment?.comment }}
        </div>
      </div>

      <div>
        <button
          v-if="deleteBtnEnable"
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
import DeleteIcon from "../../icons/DeleteIcon.vue";
import { useCommentStore } from "../../../store/CommentStore.js";
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  deleteBtnEnable: {
    type: Boolean,
    required: true,
  },
});

const commentStore = useCommentStore();
const comments = ref(commentStore.comments);

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
