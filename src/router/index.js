import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/view/HomeView.vue";
import LoginView from "@/view/LoginView.vue";
import RegistrationView from "@/view/RegistrationView.vue";
import UserView from "@/view/UserView.vue";
import UserPosts from "@/components/user/user-sections/UserPosts.vue";
import CreatePost from "@/components/user/user-sections/CreatePost.vue";
import { useAuthStore } from "@/store/AuthStore.js";

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
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: RegistrationView,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
    redirect: { name: "user-posts" },
    meta: {
      isEditor: true,
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "user-posts",
        component: UserPosts,
      },
      {
        path: "create-post",
        name: "create-post",
        component: CreatePost,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuth) {
    next({ name: "login" });
  } else if (to.meta.isAuth && authStore.isAuth) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
