import { store } from "@/store";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

const isAuthenticateGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const { ok } = await store.dispatch("authModule/checkAuthentication");

  if (ok) {
    return next();
  }

  next({ name: "auth-login" });
};

export default isAuthenticateGuard;
