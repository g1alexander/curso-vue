<template>
  <div v-if="isLoadingPlaces" class="alert alert-primary text-center">
    <h5>cargando...</h5>
  </div>

  <ul v-else-if="places.length > 0" class="list-group mt-3">
    <li
      v-for="place in places"
      :key="place.id"
      class="list-group list-group-item-action mb-3"
      :class="{ active: activePlace === place.id }"
      @click="onPlaceClicked(place)"
    >
      <h5>{{ place.text }}</h5>
      <p>{{ place.place_name }}</p>

      <button
        class="btn"
        :class="
          activePlace === place.id ? 'btn-outline-light' : 'btn-outline-primary'
        "
      >
        Direccion
      </button>
    </li>
  </ul>
</template>

<script lang="ts" src="./SearchResults"></script>

<style scoped>
.active {
  background-color: #0d6efd;
  color: #fff;
  padding: 1rem;
}
</style>
