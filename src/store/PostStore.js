import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./AuthStore.js";
import { useUserStore } from "./UserStore.js";

export const usePostStore = defineStore("postStore", {
  id: "post",
  state: () => ({
    posts: [],
  }),
  actions: {
    async fetchPosts(page = 1) {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/posts?page=${page}`,
      );

      if (response.status === 200) {
        this.posts = response.data.posts;
      }
    },
    async postStore(values) {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("body", values.body);
      formData.append("user_id", useUserStore().user?.id);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/posts",
          formData,
          {
            headers: {
              Authorization: `Bearer ${useAuthStore().isAuth}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async postEdit(values, postId) {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("body", values.body);
      formData.append("published_date", values.published_date);

      try {
        await axios.put(
          `http://127.0.0.1:8000/api/posts/${postId}/update`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${useAuthStore().isAuth}`,
              accept: "*/*",
              "Content-Type": "application/json",
            },
          },
        );

        await this.fetchPosts(this.posts?.current_page);
      } catch (error) {
        console.log(error);
      }
    },
    async postDestroy(postId) {
      const formData = new FormData();
      formData.append("user_id", useUserStore().user?.id);

      try {
        await axios.post(
          `http://127.0.0.1:8000/api/posts/${postId}/destroy`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${useAuthStore().isAuth}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );

        await this.fetchPosts(this.posts?.current_page);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {},
});
