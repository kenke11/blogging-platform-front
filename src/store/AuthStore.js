import { defineStore } from "pinia";
import axios from "axios";
import router from "../router/index.js";

export const useAuthStore = defineStore("authStore", {
  id: "auth",
  state: () => ({
    isAuth: localStorage.getItem("user_token"),
  }),
  actions: {
    async login(values) {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/login",
          formData,
        );
        console.log(response);

        const data = response.data;

        if (data.token) {
          this.isAuth = data.token;
          await router.push({ name: "home" });
          localStorage.setItem("user_token", response.data.token);
        } else {
          this.isAuth = null;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async signup(values) {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("role", values.role);
        formData.append("password", values.password);

        const response = await axios.post(
          "http://127.0.0.1:8000/api/signup",
          formData,
        );

        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {},
});
