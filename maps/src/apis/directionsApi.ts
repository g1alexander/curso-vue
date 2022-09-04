import axios from "axios";

const directionApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    alternatives: false,
    access_token:
      "pk.eyJ1IjoiZzFhbGV4YW5kZXIiLCJhIjoiY2w3bWhtaXRtMWEyZDN5bXFmZXl3M2x0cCJ9.ztYp1Q4WIa5NW0R3DdsYfw",
    geometries: "geojson",
    overview: "simplified",
    steps: false,
  },
});

export default directionApi;
