<script lang="ts" src="./SearchBar"></script>

<template>
  <div class="search-bar">
    <input
      v-model="searchTerm"
      type="search"
      placeholder="busca lugares"
      class="form-control"
    />
    {{ debounceValue }}
    <SearchResults />
  </div>
</template>

<style scoped>
.search-bar {
  position: fixed;
  top: 30px;
  left: 30px;
  background-color: white;
  z-index: 99;
  width: 300px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 5px;
}

li {
  cursor: pointer;
}
</style>
