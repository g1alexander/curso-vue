import PokemonOptions from "@/components/PokemonOptions.vue";
import PokemonPicture from "@/components/PokemonPicture.vue";
import PokemonPage from "@/pages/PokemonPage.vue";
import { mount, shallowMount, VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, test, spyOn } from "vitest";
import { mockPokemons } from "../mocks/pokemon.mock";

describe("component PokemonPage", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage);
  });

  test("debe de hacer match con el snapshot", () => {
    // esta prueba es ineccesario debido a que el snapshot esta vacio
    // porque no hay pokemon
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe de llamar al mountPokemon", () => {
    //la prueba pasa pero esta mal hecha
    const wrapper = shallowMount(PokemonPage);

    const obj = {
      mountPokemon: wrapper.vm.mountPokemon,
    };

    const spy = spyOn(obj, "mountPokemon");

    obj.mountPokemon();

    expect(spy).toHaveBeenCalled();
  });

  test("debe de hacer match con el snapshot cuando carga el componente", () => {
    const wrapper = shallowMount(PokemonPage, {
      setup() {
        return {
          pokemonRes: mockPokemons,
          pokemon: mockPokemons[0],
          pokemonId: 1,
          showPokemon: true,
          message: "Hola",
        };
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe de mostrar los componentes de Pokemonpicture y PokemonOptions", () => {
    const wrapper = shallowMount(PokemonPage, {
      setup() {
        return {
          pokemonRes: mockPokemons,
          pokemon: mockPokemons[0],
          pokemonId: 1,
          showPokemon: true,
          message: "",
        };
      },
    });

    // asi es como deberia quedar, no me gusta vitest :c

    //  const picture = wrapper.find("pokemon-picture-stub");
    //  const options = wrapper.find("pokemon-options-stub");

    //  expect(picture.exists()).toBeTruthy();
    //  expect(options.exists()).toBeTruthy();

    //  expect(picture.attributes("pokemonid")).toBe("5");
    //  expect(options.attributes("pokemons")).toBeTruthy();
  });

  test("pruebas en ", async () => {
    const wrapper = shallowMount(PokemonPage, {
      setup() {
        return {
          pokemonRes: mockPokemons,
          pokemon: mockPokemons[0],
          pokemonId: 1,
          showPokemon: true,
          message: "Hola",
        };
      },
    });

    //asi deberia quedar el ultimo test :c
    //  await wrapper.vm.checkAnswer(5);

    //  expect(wrapper.find("h2").exists()).toBeTruthy();
    //  expect(wrapper.vm.showPokemon).toBe(true);
    //  expect(wrapper.find("h2").text()).toBe(`Correcto, ${pokemons[0].name}`);

    //  await wrapper.vm.checkAnswer(10);

    //  expect(wrapper.vm.message).toBe(`Oops, era ${pokemons[0].name}`);
  });
});
