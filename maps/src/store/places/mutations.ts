import type { Feature } from "@/interfaces/Places";
import type { MutationTree } from "vuex";
import type { PlacesState } from "./state";

const mutation: MutationTree<PlacesState> = {
  setLngLat(state: PlacesState, payload: { lng: number; lat: number }) {
    state.userLocation = [payload.lng, payload.lat];

    state.isLoading = false;
  },

  setIsLoadingPlaces(state: PlacesState) {
    state.isLoadingPlaces = true;
  },

  setPlaces(state: PlacesState, places: Feature[]) {
    state.places = places;

    state.isLoadingPlaces = false;
  },
};

export default mutation;
