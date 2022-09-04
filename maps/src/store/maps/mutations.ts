import type { Feature } from "@/interfaces/Places";
import type Mapboxgl from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import type { MutationTree } from "vuex";
import type { mapState } from "./state";

const mutation: MutationTree<mapState> = {
  setMap(state: mapState, map: Mapboxgl.Map) {
    state.map = map;
  },

  setPlaceMarkers(state: mapState, places: Feature[]) {
    state.markers.forEach((marker) => marker.remove());
    state.markers = [];

    if (!state.map) return;

    for (const place of places) {
      const [lng, lat] = place.center;

      const myPopup = new mapboxgl.Popup({ offset: 25 })
        .setLngLat([lng, lat]) // add popups
        .setHTML(`<h3>${place.text}</h3><p>${place.place_name}</p>`);

      const myLocationMarker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(myPopup)
        .addTo(state.map);

      state.markers.push(myLocationMarker);
    }
  },
};

export default mutation;
