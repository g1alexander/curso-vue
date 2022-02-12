<script setup lang="ts">
import { inject, type PropType } from "vue";
import type { PokemonsOptions } from "../helpers/interfaces/PokemonOptions";

interface PokemonId {
  pokemonId: { value: number };
  showPokemon: { value: boolean };
}

const props = defineProps({
  pokemons: {
    type: Array as PropType<PokemonsOptions[]>,
    required: true,
  },
});

let pokemon = inject("pokemon") as PokemonId;

const changeId = (id: number): void => {
  pokemon.pokemonId.value = id;
  pokemon.showPokemon.value = true;
};

defineExpose({
  pokemon,
  changeId,
});
</script>

<template>
  <div class="options-container">
    <ul>
      <li
        @click="changeId(pokemon.id)"
        v-for="pokemon in props.pokemons"
        :key="pokemon.id"
      >
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>

<style></style>
