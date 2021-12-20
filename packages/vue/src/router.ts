import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

export const routes: (RouteRecordRaw & { icon: string })[] = [
  {
    path: "/machines",
    name: "machines",
    icon: "nas",
    component: () => import("./views/MachinesView.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    icon: "settings",
    component: () => import("./views/SettingsView.vue"),
  },
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
