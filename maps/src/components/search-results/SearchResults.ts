import { useMapStore, usePlacesStore } from "@/composables";
import type { Feature } from "@/interfaces/Places";
import { ref, watch } from "vue";

export default {
  setup() {
    const { isLoadingPlaces, places } = usePlacesStore();

    const { map, setPlaceMarkers } = useMapStore();

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
    };
  },
};
