<script setup lang="ts">
import { useMapStore, usePlacesStore } from "@/composables";
import { computed } from "vue";

const { isUserLocationReady, userLocation } = usePlacesStore();

const { map, isMapReady } = useMapStore();

const onMyLocationBtnClick = () => {
  map.value?.flyTo({
    center: [userLocation.value[0], userLocation.value[1]],
    zoom: 15,
  });
};

const isBtnReady = computed<boolean>(
  () => isMapReady.value && isUserLocationReady.value
);
</script>

<template>
  <button
    v-if="isBtnReady"
    @click="onMyLocationBtnClick"
    class="btn btn-primary"
  >
    ir a mi ubicación
  </button>
</template>

<style scoped>
button {
  position: fixed;
  top: 30px;
  right: 30px;
}
</style>
