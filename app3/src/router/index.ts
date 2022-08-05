import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import daybook from "@/modules/daybook/router";
import auth from "@/modules/auth/router";

const routes: Array<RouteRecordRaw> = [
  {
    ...daybook,
  },
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
  },
  {
    ...auth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
