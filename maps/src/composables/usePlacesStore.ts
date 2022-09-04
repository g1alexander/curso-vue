import { useStore } from "vuex";
import type { StateInterface } from "@/store";
import { computed, onMounted } from "vue";

export const usePlacesStore = () => {
  const store = useStore<StateInterface>();

  onMounted(() => {
    if (!store.getters["placesModule/isUserLocationReady"]) {
      store.dispatch("placesModule/getInitialLocation");
    }
  });

  return {
    //state
    isLoading: computed(() => store.state.placesModule.isLoading),
    userLocation: computed(
      () => store.state.placesModule.userLocation || [0, 0]
    ),
    places: computed(() => store.state.placesModule.places),
    isLoadingPlaces: computed(() => store.state.placesModule.isLoadingPlaces),

    //getters
    isUserLocationReady: computed<boolean>(
      () => store.getters["placesModule/isUserLocationReady"]
    ),

    //actions
    searchByTerm: async (query = "") =>
      await store.dispatch("placesModule/searchPlacesByTerm", query),
  };
};
