<script setup lang="ts">
import PokemonPicture from "../components/PokemonPicture.vue";
import PokemonOptions from "../components/PokemonOptions.vue";
import { getPokemonsOptions } from "../helpers/getPokemonOptions";
import { onMounted, provide, ref, watchEffect } from "vue";
import type { PokemonsOptions } from "@/helpers/interfaces/PokemonOptions";

const pokemonRes = ref<PokemonsOptions[]>([]);
const pokemon = ref<PokemonsOptions>({ name: "", id: 1 });
const pokemonId = ref<number>(0);
const message = ref<string>("");
const showPokemon = ref<boolean>(false);

provide("pokemon", { pokemonId, showPokemon });

watchEffect(() => {
  if (pokemonId.value === pokemon.value.id) {
    message.value = `You already have this pokemon ${pokemon.value.name}`;
  } else {
    message.value = `F parce era ${pokemon.value.name}`;
  }
});

const mountPokemon = async () => {
  pokemonRes.value = await getPokemonsOptions();

  const pokemonId: number = Math.floor(Math.random() * pokemonRes.value.length);

  pokemon.value = pokemonRes.value[pokemonId];
};

onMounted(() => {
  mountPokemon();
});

const newGame = async () => {
  message.value = "";
  pokemonId.value = 0;
  showPokemon.value = false;
  mountPokemon();
};
</script>

<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>

  <section v-else>
    <h1>¿Quien es el pokemon? {{ pokemonId }}</h1>

    <PokemonPicture :pokemon-id="pokemon.id" :show-pokemon="showPokemon" />

    <PokemonOptions :pokemons="pokemonRes" />

    <template v-if="showPokemon">
      <h2>{{ message }}</h2>
      <button @click="newGame">Nuevo juego</button>
    </template>
  </section>
</template>

<style></style>
