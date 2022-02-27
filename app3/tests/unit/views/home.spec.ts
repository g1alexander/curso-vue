import HomeVue from "@/views/Home.vue";
import { shallowMount } from "@vue/test-utils";

describe("pruebas en el Home view", () => {
  test("debe de renderizar el componente correctamente", () => {
    const wrapper = shallowMount(HomeVue);

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("hacer click en un boton debe de redireccionar a no-entry", () => {
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = shallowMount(HomeVue, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });

    wrapper.find("button").trigger("click");

    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.push).toBeCalledWith({ name: "no-entry" });
  });
});
