import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "./UserStore.js";
import { useAuthStore } from "./AuthStore.js";

export const useCommentStore = defineStore("commentStore", {
  id: "comment",
  state: () => ({
    comments: [],
  }),
  actions: {
    async fetchComments(postId) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/comments/posts/${postId}`,
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
          "http://127.0.0.1:8000/api/comments",
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
    removeComments() {
      this.comments = [];
    },
  },
  getters: {},
});
