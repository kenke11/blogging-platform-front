import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./AuthStore.js";

export const useUserStore = defineStore("userStore", {
  id: "user",
  state: () => ({
    user: [],
  }),
  actions: {
    async fetchUser(token) {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = response.data;
        console.log(response);
      } catch (error) {
        useAuthStore().isAuth = null;
        this.user = [];
        localStorage.removeItem("driver_token");
      }
    },
  },
  getters: {},
});
