// import { RouteRecordRaw } from "vue-router";

const router = {
  path: "/auth",
  name: "auth",
  component: () =>
    import(
      /* webpackChunkName: "auth" */ "@/modules/auth/layout/AuthLayout.vue"
    ),

  children: [
    {
      path: "",
      name: "auth-login",
      component: () =>
        import(
          /* webpackChunkName: "auth-login" */ "@/modules/auth/views/Login.vue"
        ),
    },
    {
      path: "register",
      name: "auth-register",
      component: () =>
        import(
          /* webpackChunkName: "auth-login" */ "@/modules/auth/views/Register.vue"
        ),
    },
  ],
};

export default router;
