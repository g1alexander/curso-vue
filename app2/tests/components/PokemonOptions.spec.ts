import { describe, expect, test } from "vitest";
import { shallowMount } from "@vue/test-utils";
import PokemonOptions from "../../src/components/PokemonOptions.vue";
import { mockPokemons } from "../mocks/pokemon.mock";

describe("PokemonOptions component", () => {
  const wrapper = shallowMount(PokemonOptions, {
    props: {
      pokemons: mockPokemons,
    },
    global: {
      provide: {
        pokemon: {
          pokemonId: { value: 0 },
          showPokemon: { value: false },
        },
      },
    },
  });

  test("should to macth snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe de mostrar las 4 opciones correctamente", () => {
    const [li1, li2, li3, li4] = wrapper.findAll("li");

    expect(wrapper.findAll("li").length).toBe(4);

    expect(li1.text()).toBe("bulbasaur");
    expect(li2.text()).toBe("ivysaur");
    expect(li3.text()).toBe("venusaur");
    expect(li4.text()).toBe("charmander");
  });

  test("should", () => {
    const [li1, li2, li3, li4] = wrapper.findAll("li");

    li1.trigger("click");
    expect(wrapper.vm.pokemon.pokemonId.value).toBe(1);

    li2.trigger("click");
    expect(wrapper.vm.pokemon.pokemonId.value).toBe(2);

    li3.trigger("click");
    expect(wrapper.vm.pokemon.pokemonId.value).toBe(3);

    li4.trigger("click");
    expect(wrapper.vm.pokemon.pokemonId.value).toBe(4);
  });
});
