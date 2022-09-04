import type { GetterTree } from "vuex";
import type { mapState } from "./state";
import type { StateInterface } from "../index";

const getters: GetterTree<mapState, StateInterface> = {
  isMapready(state: mapState) {
    return !!state.map;
  },
};

export default getters;
