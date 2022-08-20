import { AuthState } from "./interface/State";

// export const myMutations = (state: AuthState) => {
//   console.log(state);
// };

interface Data {
  user: User;
  idToken: string;
  refreshToken: string;
}

interface User {
  email: string;
  name: string;
}

export const loginUser = (state: AuthState, data: Data) => {
  if (data.idToken) {
    localStorage.setItem("idToken", data.idToken);
    state.idtoken = data.idToken;
  }

  if (data.refreshToken) {
    localStorage.setItem("refreshToken", data.refreshToken);
    state.refreshtoken = data.refreshToken;
  }

  state.user = data.user;
  state.status = "authenticated";
};

export const logout = (state: AuthState) => {
  state.user = null;
  state.status = "not-authenticated";
  state.idtoken = null;
  state.refreshtoken = null;

  localStorage.removeItem("idToken");
  localStorage.removeItem("refreshToken");
};
