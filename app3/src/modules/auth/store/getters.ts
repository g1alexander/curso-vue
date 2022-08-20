import { AuthState } from "./interface/State";

// export const myGetters = (state: AuthState) => {
//   return;
// };
export const currentState = (state: AuthState) => {
  return state.status;
};
