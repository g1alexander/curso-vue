import { describe, expect, test } from "vitest";
import {
  getPokemons,
  getPokemonsName,
  getPokemonsOptions,
} from "@/helpers/getPokemonOptions";
import { mockPokemons } from "../mocks/pokemon.mock";

describe("getPokemonOptions helpers", () => {
  test("debe regresar un arreglo de numeros", () => {
    const pokemons = getPokemons();

    expect(pokemons.length).toBe(650);

    expect(pokemons[0]).toBe(1);

    expect(pokemons[499]).toBe(500);

    expect(pokemons[649]).toBe(650);
  });

  test("debe de retornar un arreglo de 4 elementos", async () => {
    const pokemons = await getPokemonsName([1, 2, 3, 4]);

    expect(pokemons).toEqual(mockPokemons);
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
