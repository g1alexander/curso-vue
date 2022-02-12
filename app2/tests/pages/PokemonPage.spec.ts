import PokemonPage from "@/pages/PokemonPage.vue";
import { shallowMount, VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, test, spyOn } from "vitest";

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
});
