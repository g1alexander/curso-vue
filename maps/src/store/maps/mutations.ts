import type { Feature } from "@/interfaces/Places";
import type Mapboxgl from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import type { MutationTree } from "vuex";
import type { mapState } from "./state";

const mutation: MutationTree<mapState> = {
  setMap(state: mapState, map: Mapboxgl.Map) {
    state.map = map;
  },

  setDistanceDuration(
    state: mapState,
    { distance, duration }: { distance: number; duration: number }
  ) {
    let kms = distance / 1000;
    kms = Math.round(kms * 100);
    kms /= 100;

    state.distance = kms;
    state.duration = Math.floor(duration / 60);
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

    if (state.map?.getLayer("RouteString")) {
      state.map.removeLayer("RouteString");
      state.map.removeSource("RouteString");

      state.distance = undefined;
      state.duration = undefined;
    }
  },

  setRoutePolyline(state: mapState, coords: number[][]) {
    const start = coords[0];

    const end = coords[coords.length - 1];

    //definir los bounds
    const bounds = new mapboxgl.LngLatBounds(
      [start[0], start[1]],
      [start[0], start[1]]
    );

    //agregar cada punto al bounds
    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, {
      padding: 200,
    });

    //polyline
    const sourcerData: mapboxgl.AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    };

    if (state.map?.getLayer("RouteString")) {
      state.map.removeLayer("RouteString");
      state.map.removeSource("RouteString");
    }

    state.map?.addSource("RouteString", sourcerData);

    state.map?.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "black",
        "line-width": 3,
      },
    });
  },
};

export default mutation;
