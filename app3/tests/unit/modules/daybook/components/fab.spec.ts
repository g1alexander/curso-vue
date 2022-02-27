import FabVue from "@/modules/daybook/components/Fab.vue";
import { shallowMount } from "@vue/test-utils";

describe("pruebas en el fab component", () => {
  test("debe de mostrar el icono por defecto", () => {
    const wrapper = shallowMount(FabVue);

    const classes = wrapper.find("i").classes();

    expect(classes.includes("fa-plus")).toBe(true);
  });

  test("debe de mostrar el icono por argumento: fa-circle", () => {
    const wrapper = shallowMount(FabVue, {
      props: {
        icon: "fa-circle",
      },
    });

    const classes = wrapper.find("i").classes();

    expect(classes.includes("fa-circle")).toBe(true);
  });

  test("debe de emitir el evento on:click cuando se hace click", () => {
    const wrapper = shallowMount(FabVue);

    wrapper.find("button").trigger("click");

    expect(wrapper.emitted("on:click")).toHaveLength(1);
  });
});
