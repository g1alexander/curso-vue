import state from "./state";
import * as actions from "./actions";
import * as getters from "./getters";
import * as mutations from "./mutations";

export const authModule = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
