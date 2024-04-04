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
    async postStore(values) {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("body", values.body);
      formData.append("author_id", useUserStore().user?.id);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/posts/store",
          {
            headers: {
              Authorization: `Bearer ${useAuthStore().isAuth}`,
            },
          },
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {},
});
