import { RouteRecordRaw } from "vue-router";

const router: RouteRecordRaw = {
  path: "/daybook",
  name: "daybook",
  component: () =>
    import(
      /* webpackChunkName: "daybook" */ "@/modules/daybook/layout/DayBookLayout.vue"
    ),

  children: [],
};

export default router;
