import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router/index.js";
import { useUserStore } from "@/store/UserStore.js";

export const useAuthStore = defineStore("authStore", {
  id: "auth",
  state: () => ({
    isAuth: localStorage.getItem("user_token"),
    validationErrors: [],
  }),
  actions: {
    async login(values) {
      this.validationErrors = [];
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACK_URL}/login`,
          formData,
        );

        const data = response.data;
        if (data.token) {
          this.isAuth = data.token;
          await router.push({ name: "home" });
          localStorage.setItem("user_token", response.data.token);
          await useUserStore().fetchUser(data.token);
        } else {
          this.isAuth = null;
        }
      } catch (error) {
        if (error.response.status === 422) {
          this.validationErrors = error.response.data.errors;
        }
      }
    },
    async logout() {
      const formData = new FormData();
      formData.append("user_id", useUserStore().user.id);

      await axios.post(
        `${import.meta.env.VITE_APP_BACK_URL}/logout`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${useAuthStore().isAuth}`,
            accept: "*/*",
            "Content-Type": "application/json",
          },
        },
      );

      this.isAuth = null;
      await router.push({ name: "home" });
      localStorage.removeItem("user_token");
    },
    async signup(values) {
      this.validationErrors = [];

      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("role", values.role);
        formData.append("password", values.password);

        await axios.post(
          `${import.meta.env.VITE_APP_BACK_URL}/signup`,
          formData,
        );

        await router.push({ name: "login" });
      } catch (error) {
        if (error.response.status === 422) {
          this.validationErrors = error.response.data.errors;
        }
      }
    },
  },
  getters: {},
});
