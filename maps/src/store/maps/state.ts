import type Mapboxgl from "mapbox-gl";

export interface mapState {
  map?: Mapboxgl.Map;
  markers: Mapboxgl.Marker[];
  distance?: number;
  duration?: number;
}

function state(): mapState {
  return {
    map: undefined,
    markers: [],
    distance: undefined,
    duration: undefined,
  };
}

export default state;
