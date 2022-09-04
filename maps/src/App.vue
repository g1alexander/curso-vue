<script setup lang="ts">
import { usePlacesStore } from "./composables";
import MapView from "./components/mapview/mapView.vue";
import MyLocationBtn from "./components/btn/MyLocationBtn.vue";
import SearchBar from "./components/searchbar/SearchBar.vue";
import TripDetails from "./components/TripDetails.vue";

usePlacesStore();
</script>

<template>
  <main>
    <MapView />
    <SearchBar />
    <MyLocationBtn />

    <TripDetails />

    <img src="@/assets/logo.svg" width="100" alt="" />
  </main>
</template>
