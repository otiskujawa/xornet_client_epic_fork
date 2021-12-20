import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: () => import("./views/homepage.vue") },
  { path: "/machines", name: "machines", component: () => import("./views/machines.vue") },
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
