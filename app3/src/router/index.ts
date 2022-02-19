import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import daybook from "@/modules/daybook/router";

const routes: Array<RouteRecordRaw> = [
  {
    ...daybook,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
