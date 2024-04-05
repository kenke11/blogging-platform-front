import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "@/store/UserStore.js";
import { useAuthStore } from "@/store/AuthStore.js";

export const useCommentStore = defineStore("commentStore", {
  id: "comment",
  state: () => ({
    comments: [],
  }),
  actions: {
    async fetchComments(postId) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BACK_URL}/comments/posts/${postId}`,
        );

        if (response.status === 200) {
          this.comments = response.data.comments;
        }
      } catch (e) {
        this.removeComments();
        console.log(e);
      }
    },
    async commentStore(values, postId) {
      const formData = new FormData();
      formData.append("comment", values.comment);
      formData.append("post_id", postId);
      formData.append("user_id", useUserStore().user?.id);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACK_URL}/comments`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${useAuthStore().isAuth}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );

        const newComment = {
          ...response.data.comment,
          user: useUserStore().user,
        };
        this.comments.unshift(newComment);
      } catch (error) {
        console.log(error);
      }
    },
    async commentDestroy(commentId, postId) {
      const formData = new FormData();
      formData.append("user_id", useUserStore().user?.id);
      formData.append("post_id", postId);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACK_URL}/comments/${commentId}/destroy`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${useAuthStore().isAuth}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );

        if (response.status === 200) {
          this.comments = this.comments.filter(
            (comment) => comment.id !== commentId,
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    removeComments() {
      this.comments = [];
    },
  },
  getters: {},
});
