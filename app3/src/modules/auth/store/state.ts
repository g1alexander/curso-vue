import { AuthState } from "./interface/State";

const state: AuthState = {
  status: "authenticating",
  user: null,
  idtoken: null,
  refreshtoken: null,
};

export default (): AuthState => ({ ...state });
