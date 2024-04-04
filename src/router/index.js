import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../view/HomeView.vue";
import LoginView from "../view/LoginView.vue";
import RegistrationView from "../view/RegistrationView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "signup",
    component: RegistrationView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
