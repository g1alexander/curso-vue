import type Mapboxgl from "mapbox-gl";
import type { MutationTree } from "vuex";
import type { mapState } from "./state";

const mutation: MutationTree<mapState> = {
  setMap(state: mapState, map: Mapboxgl.Map) {
    state.map = map;
  },
};

export default mutation;
