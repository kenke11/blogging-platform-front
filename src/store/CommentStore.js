import { defineStore } from "pinia";
import axios from "axios";

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
    removeComments() {
      this.comments = [];
    },
  },
  getters: {},
});
