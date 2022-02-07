import { describe, expect, test } from "vitest";
import {
  getPokemons,
  getPokemonsName,
  getPokemonsOptions,
} from "@/helpers/getPokemonOptions";
import type { PokemonsOptions } from "@/helpers/interfaces/PokemonOptions";

describe("getPokemonOptions helpers", () => {
  test("debe regresar un arreglo de numeros", () => {
    const pokemons = getPokemons();

    expect(pokemons.length).toBe(650);

    expect(pokemons[0]).toBe(1);

    expect(pokemons[499]).toBe(500);

    expect(pokemons[649]).toBe(650);
  });

  test("debe de retornar un arreglo de 4 elementos", async () => {
    const res: PokemonsOptions[] = [
      { name: "bulbasaur", id: 1 },
      { name: "ivysaur", id: 2 },
      { name: "venusaur", id: 3 },
      { name: "charmander", id: 4 },
    ];

    const pokemons = await getPokemonsName([1, 2, 3, 4]);

    expect(pokemons).toEqual(res);
  });

  test("getPokemonsOptions debe de retornar un arreglo mezclado", async () => {
    const pokemons = await getPokemonsOptions();

    expect(pokemons.length).toBe(4);
    expect(pokemons).toEqual([
      { name: expect.any(String), id: expect.any(Number) },
      { name: expect.any(String), id: expect.any(Number) },
      { name: expect.any(String), id: expect.any(Number) },
      { name: expect.any(String), id: expect.any(Number) },
    ]);
  });
});
