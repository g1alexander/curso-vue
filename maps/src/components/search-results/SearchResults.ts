import { usePlacesStore } from "@/composables";

export default {
  setup() {
    const { isLoadingPlaces, places } = usePlacesStore();

    return { isLoadingPlaces, places };
  },
};
