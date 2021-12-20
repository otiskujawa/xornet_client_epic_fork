import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: () => import("./views/HomeView.vue") },
  { path: "/machines", name: "machines", component: () => import("./views/MachinesView.vue") },
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
