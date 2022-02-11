<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  pokemonId: {
    type: Number,
    required: true,
  },
  showPokemon: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const imgSrc = computed(
  () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`
);
</script>

<template>
  <div class="pokemon-container">
    <img
      v-if="!showPokemon"
      :src="imgSrc"
      alt="pokemon"
      class="hidden-pokemon"
    />

    <img v-else :src="imgSrc" alt="pokemon" class="fade-in" />
  </div>
</template>
