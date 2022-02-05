import type { Pokemon } from "@/api/interface/Pokemon";
import { pokemonApi } from "@/api/pokemonApi";
import type { PokemonsOptions } from "./interfaces/PokemonOptions";

const getPokemons = (): number[] =>
  Array.from({ length: 650 }, (_, i) => i + 1);

const getPokemonsName = async ([a, b, c, d]: number[]): Promise<
  PokemonsOptions[]
> => {
  const promiseArr = [
    pokemonApi.get<Pokemon>(`/${a}`),
    pokemonApi.get<Pokemon>(`/${b}`),
    pokemonApi.get<Pokemon>(`/${c}`),
    pokemonApi.get<Pokemon>(`/${d}`),
  ];

  const [res1, res2, res3, res4] = await Promise.all(promiseArr);

  return [
    { name: res1.data.name, id: res1.data.id },
    { name: res2.data.name, id: res2.data.id },
    { name: res3.data.name, id: res3.data.id },
    { name: res4.data.name, id: res4.data.id },
  ];
};

export const getPokemonsOptions = (): Promise<PokemonsOptions[]> => {
  const mixedPokemons: number[] = getPokemons().sort(() => Math.random() - 0.5);

  return getPokemonsName(mixedPokemons);
};
