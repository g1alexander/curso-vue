<template>
  <div v-if="distance" class="trip-container column">
    <div class="col">
      Distancia: <strong>{{ distance }}</strong> kms
    </div>
    <div class="col">
      duracion: <strong>{{ duration }}</strong> minutos
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMapStore } from "@/composables";

const { distance, duration } = useMapStore();
</script>

<style scoped>
.trip-container {
  padding: 10px;
  position: fixed;
  bottom: 100px;
  left: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  font-size: 20px;
  width: 200px;
}
</style>
