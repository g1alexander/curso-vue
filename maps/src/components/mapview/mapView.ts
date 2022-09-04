import { onMounted, ref, watch } from "vue";
import { usePlacesStore, useMapStore } from "@/composables/";
import mapboxgl from "mapbox-gl";

export default {
  setup() {
    const mapElement = ref<HTMLDivElement>();

    const { userLocation, isUserLocationReady } = usePlacesStore();

    const { setMap } = useMapStore();

    const initMap = async () => {
      if (!mapElement.value) return;

      await Promise.resolve();

      const map = new mapboxgl.Map({
        container: mapElement.value, // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [userLocation.value[0], userLocation.value[1]], // starting position [lng, lat]
        zoom: 15, // starting zoom
        projection: { name: "globe" }, // display the map as a 3D globe
      });
      map.on("style.load", () => {
        map.setFog({}); // Set the default atmosphere style
      });

      const myPopup = new mapboxgl.Popup({ offset: 25 })
        .setLngLat([userLocation.value[0], userLocation.value[1]]) // add popups
        .setHTML(`<h3>Hello world</h3><p>🇨🇴</p>`);

      const myLocationMarker = new mapboxgl.Marker()
        .setLngLat([userLocation.value[0], userLocation.value[1]])
        .setPopup(myPopup)
        .addTo(map);

      setMap(map);
    };

    onMounted(() => {
      if (isUserLocationReady.value) {
        initMap();
        return;
      }

      console.log("F");
    });

    watch(
      () => isUserLocationReady.value,
      () => isUserLocationReady.value && initMap()
    );

    return { userLocation, isUserLocationReady, mapElement };
  },
};
