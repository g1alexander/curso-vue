import type { ActionTree } from "vuex";
import type { mapState } from "./state";
import type { StateInterface } from "../index";

const actions: ActionTree<mapState, StateInterface> = {
  someAction(/*{ commit }, payload  */) {
    // a line to prevent linter errors
  },
};

export default actions;
