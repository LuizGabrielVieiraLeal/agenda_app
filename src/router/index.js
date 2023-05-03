import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { LocalStorage, SessionStorage } from "quasar";

function isAuthenticated() {
  const lStorage = LocalStorage.getItem(process.env.storageName);
  const sStorage = SessionStorage.getItem(process.env.storageName);

  return lStorage !== null || sStorage !== null;
}

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    if (isAuthenticated() && to.name !== "login") next();
    if (isAuthenticated() && to.name === "login")
      Router.push({ name: "agenda" });
    if (!isAuthenticated() && to.name === "login") next();
    if (!isAuthenticated() && to.name !== "login")
      Router.push({ name: "login" });
  });

  return Router;
});
