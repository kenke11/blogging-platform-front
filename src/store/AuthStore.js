import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("authStore", {
  id: "auth",
  state: () => ({
    isAuth: null,
  }),
  actions: {
    async singup(values) {
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
