import { State } from "@/store";
import { ActionContext } from "vuex";
import { AuthState } from "./interface/State";
import { authApi } from "../../../api/authApi";
import { AxiosError } from "axios";

type Context = ActionContext<AuthState, State>;

// export const myAction = async (store: Context): Promise<void> => {
//   console.log(store);
// };

interface User {
  name: string;
  email: string;
  password?: string;
}

export const createUser = async (
  store: Context,
  user: User
): Promise<{ ok: boolean; message: string }> => {
  const { email, name, password } = user;

  try {
    const { data } = await authApi.post(":signUp", {
      email,
      password,
      returnSecureToken: true,
    });

    const { idToken, refreshToken } = data;

    await authApi.post(":update", {
      displayName: name,
      idToken,
    });

    delete user.password;
    store.commit("loginUser", { user, idToken, refreshToken });

    return { ok: true, message: "ok" };
  } catch (error: unknown) {
    const err = error as AxiosError;

    return { ok: false, message: err.response?.data.error.message };
  }
};

export const signInUser = async (
  store: Context,
  user: User
): Promise<{ ok: boolean; message: string }> => {
  const { email, password } = user;

  try {
    const { data } = await authApi.post(":signInWithPassword", {
      email,
      password,
      returnSecureToken: true,
    });

    const { idToken, refreshToken, displayName } = data;

    user.name = displayName;

    delete user.password;

    store.commit("loginUser", { user, idToken, refreshToken });

    return { ok: true, message: "ok" };
  } catch (error: unknown) {
    const err = error as AxiosError;

    return { ok: false, message: err.response?.data.error.message };
  }
};

export const checkAuthentication = async (
  store: Context
): Promise<{ ok: boolean; message: string }> => {
  const idToken = localStorage.getItem("idToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!idToken) {
    store.commit("logout");
    return { ok: false, message: "no hay token" };
  }

  try {
    const { data } = await authApi.post(":lookup", {
      idToken,
    });

    const { displayName: name, email } = data.users[0];

    const user = {
      name,
      email,
    };

    store.commit("loginUser", { user, idToken, refreshToken });

    return { ok: true, message: "meloo" };
  } catch (error) {
    store.commit("logout");
    const err = error as AxiosError;

    return { ok: false, message: err.response?.data.error.message };
  }
};
