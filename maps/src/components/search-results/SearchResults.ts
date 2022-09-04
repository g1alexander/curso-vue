import { useMapStore, usePlacesStore } from "@/composables";
import type { Feature } from "@/interfaces/Places";
import { ref, watch } from "vue";

export default {
  setup() {
    const { isLoadingPlaces, places, userLocation } = usePlacesStore();

    const { map, setPlaceMarkers, getRouteBetweenPoints } = useMapStore();

    const activePlace = ref("");

    watch(
      () => places.value,
      (newValue) => {
        activePlace.value = "";
        setPlaceMarkers(newValue);
      }
    );

    return {
      isLoadingPlaces,
      places,
      activePlace,

      onPlaceClicked: (place: Feature) => {
        activePlace.value = place.id;

        const [lng, lat] = place.center;

        map.value?.flyTo({
          center: [lng, lat],
          zoom: 14,
        });
      },

      getRouteDirection: async (place: Feature) => {
        if (!userLocation.value) return;

        const [lng, lat] = place.center;

        const [startLng, startLat] = userLocation.value;

        const start: [number, number] = [startLng, startLat];

        const end: [number, number] = [lng, lat];

        await getRouteBetweenPoints(start, end);
      },
    };
  },
};
