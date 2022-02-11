import { describe, expect, test } from "vitest";
import { shallowMount } from "@vue/test-utils";
import PokemonPicture from "../../src/components/PokemonPicture.vue";

describe("PokemonPicture component", () => {
  test("should to match snapchot", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 1,
        showPokemon: false,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe mostrar la imagen oculta y el pokemon 100", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 100,
        showPokemon: false,
      },
    });

    const [img1, img2] = wrapper.findAll("img");
    const idPokemon = img1.attributes("src");

    expect(img1.exists()).toBe(true);

    expect(img2).toBe(undefined);

    expect(idPokemon.includes("100")).toBe(true);
  });

  test("debe de mostrar el pokemon si showPokemon:true", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 100,
        showPokemon: true,
      },
    });

    const img = wrapper.find("img");

    expect(img.classes("fade-in")).toBe(true);

    expect(img.classes("hidden-pokemon")).toBe(false);

    expect(img.exists()).toBe(true);
  });
});
