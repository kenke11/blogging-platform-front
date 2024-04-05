<template>
  <div class="pt-32 px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
    <div class="mx-auto w-full">
      <div v-if="posts?.length" class="flex flex-col space-y-10">
        <div
          v-for="post in posts"
          :key="post.id"
          class="border rounded-md px-8 py-6 flex flex-col space-y-5"
        >
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
                @click="openPostPopup(post)"
                class="border rounded-md p-2 bg-gray-100 hover:bg-gray-200"
              >
                <ViewIcon />
              </button>
              <button
                v-if="user?.id === post.user.id"
                @click="openPostEditPopup(post)"
                class="border rounded-md p-2 bg-blue-100 hover:bg-blue-200"
              >
                <EditIcon />
              </button>
              <button
                v-if="isAdmin || user?.id === post.user.id"
                @click="deletePost(post.id)"
                class="border rounded-md p-2 bg-red-100 hover:bg-red-200"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>
        <div v-if="totalPages > 1" class="flex justify-center mt-8 text-sm">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 mr-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Prev
          </button>
          <span class="px-4 py-2 bg-gray-200 rounded-md">{{
            currentPage
          }}</span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 ml-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <teleport to="body">
      <PostContainer
        v-if="isPostPopupOpen"
        :isAdmin="isAdmin"
        :post="openPost"
        :user="user"
        @closePostPopup="closePostPopup"
      />
      <PostEditContainer
        v-if="isPostEditPopupOpen"
        :post="openPost"
        :user="user"
        @closePostEditPopup="closePostEditPopup"
      />
    </teleport>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref, watch } from "vue";
import { usePostStore } from "../../store/PostStore.js";
import EditIcon from "../icons/EditIcon.vue";
import DeleteIcon from "../icons/DeleteIcon.vue";
import { useUserStore } from "../../store/UserStore.js";
import ViewIcon from "../icons/ViewIcon.vue";
import PostContainer from "./post/PostContainer.vue";
import PostEditContainer from "./post/PostEditContainer.vue";

const postStore = usePostStore();
const userStore = useUserStore();

const posts = ref(postStore.posts.data);
const user = ref(userStore.user);
const currentPage = ref(1);

const isAdmin = computed(() => userStore.role === "admin");
const totalPages = ref(userStore.posts?.last_page);

const isPostPopupOpen = ref(false);
const isPostEditPopupOpen = ref(false);

const openPost = ref({});

const deletePost = (postId) => {
  postStore.postDestroy(postId);
};

const openPostPopup = (post) => {
  openPost.value = post;
  isPostPopupOpen.value = true;
};

const closePostPopup = () => {
  openPost.value = {};
  isPostPopupOpen.value = false;
};

const openPostEditPopup = (post) => {
  openPost.value = post;
  isPostEditPopupOpen.value = true;
};

const closePostEditPopup = () => {
  openPost.value = {};
  isPostEditPopupOpen.value = false;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    postStore.fetchPosts(currentPage.value);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    postStore.fetchPosts(currentPage.value);
  }
};

onBeforeMount(() => {
  postStore.fetchPosts(1);
});

watch(
  () => postStore.posts,
  (newValue) => {
    posts.value = newValue.data;
    totalPages.value = newValue.last_page;
  },
);

watch(
  () => userStore.user,
  (newValue) => {
    user.value = newValue;
  },
);
</script>
