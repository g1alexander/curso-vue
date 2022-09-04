<template>
  <div v-if="isLoadingPlaces" class="alert alert-primary text-center">
    <h5>cargando...</h5>
  </div>

  <ul v-else-if="places.length > 0" class="list-group mt-3">
    <li
      v-for="place in places"
      :key="place.id"
      class="list-group list-group-item-action mb-3"
    >
      <h5>{{ place.text }}</h5>
      <p>{{ place.place_name }}</p>

      <button class="btn btn-outline-primary">Direccion</button>
    </li>
  </ul>
</template>

<script lang="ts" src="./SearchResults"></script>
