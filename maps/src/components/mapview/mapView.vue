<script lang="ts" src="./mapView.ts"></script>

<template>
  <div
    v-if="!isUserLocationReady"
    class="loading d-flex justify-content-center align-items-center"
  >
    <div class="text-center">
      <h3>cargando...</h3>
      <span>localizando</span>
    </div>
  </div>

  <div
    v-show="isUserLocationReady"
    ref="mapElement"
    class="map-container"
  ></div>
</template>

<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
