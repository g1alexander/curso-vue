import { State } from "@/store";
import { ActionContext } from "vuex";
import { AuthState } from "./interface/State";

type Context = ActionContext<AuthState, State>;

export const myAction = async (store: Context): Promise<void> => {
  console.log(store);
};
