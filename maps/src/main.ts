import { createApp } from "vue";
import App from "./App.vue";

import store from "@/store";
import "./assets/main.css";
import "mapbox-gl/dist/mapbox-gl.css";

import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken =
  "pk.eyJ1IjoiZzFhbGV4YW5kZXIiLCJhIjoiY2w3bWhtaXRtMWEyZDN5bXFmZXl3M2x0cCJ9.ztYp1Q4WIa5NW0R3DdsYfw";

if (!navigator.geolocation) {
  alert("F par");

  throw new Error("no soporta");
}

createApp(App).use(store).mount("#app");
