import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Homepage",
    component: () => import("~/App.vue"),
    meta: {
      title: "Xornet",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
