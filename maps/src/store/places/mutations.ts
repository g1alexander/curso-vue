import type { MutationTree } from "vuex";
import type { PlacesState } from "./state";

const mutation: MutationTree<PlacesState> = {
  setLngLat(state: PlacesState, payload: { lng: number; lat: number }) {
    state.userLocation = [payload.lng, payload.lat];

    state.isLoading = false;
  },
};

export default mutation;
