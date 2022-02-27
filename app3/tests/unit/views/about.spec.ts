import AboutVue from "@/views/About.vue";
import { shallowMount } from "@vue/test-utils";

describe("pruebas en el about view", () => {
  test("debe de renderizar el componente correctamente", () => {
    const wrapper = shallowMount(AboutVue);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
