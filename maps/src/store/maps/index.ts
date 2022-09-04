import type { Module } from "vuex";
import type { StateInterface } from "../index";

import state, { type mapState } from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const mapModule: Module<mapState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default mapModule;
