import { AuthState } from "./interface/State";

// export const myGetters = (state: AuthState) => {
//   return;
// };
export const currentState = (state: AuthState) => {
  return state.status;
};

export const username = (state: AuthState) => {
  return state.user?.name || "";
};
