import { userStore } from "src/stores/user";
import userService from "src/services/user";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/IndexPage.vue"),
        beforeEnter: (to, from, next) => {
          const uStore = userStore();
          const { isStored } = userService();

          if (uStore.isAuth() || isStored()) next();
          else next("/login");
        },
      },
      {
        path: "login",
        name: "login",
        component: () => import("pages/LoginPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
