import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import daybook from "@/modules/daybook/router";
import auth from "@/modules/auth/router";
import isAuthenticateGuard from "./auth-guard";

const routes: Array<RouteRecordRaw> = [
  {
    ...daybook,
    beforeEnter: [isAuthenticateGuard],
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
