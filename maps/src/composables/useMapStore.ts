import type { Feature } from "@/interfaces/Places";
import type { StateInterface } from "@/store";
import type mapboxgl from "mapbox-gl";
import { computed } from "vue";
import { useStore } from "vuex";
export const useMapStore = () => {
  const store = useStore<StateInterface>();

  return {
    map: computed(() => store.state.mapModule.map),
    duration: computed(() => store.state.mapModule.duration),
    distance: computed(() => store.state.mapModule.distance),

    // mutations
    setMap: (map: mapboxgl.Map) => store.commit("mapModule/setMap", map),
    setPlaceMarkers: (places: Feature[]) =>
      store.commit("mapModule/setPlaceMarkers", places),

    // getters
    isMapReady: computed(() => store.getters["mapModule/isMapready"]),
  };
};
