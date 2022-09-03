<script setup lang="ts">
import { usePlacesStore } from "./composables";
import MapView from "./components/mapview/mapView.vue";

usePlacesStore();
</script>

<template>
  <main>
    <MapView />

    <img src="@/assets/logo.svg" width="100" alt="" />
  </main>
</template>
