import NavbarVue from "@/modules/daybook/components/Navbar.vue";
import { shallowMount } from "@vue/test-utils";
import { createVuexStore } from "../../../mocks/mock-store";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

describe("pruebas en navbar componente", () => {
  const store = createVuexStore({
    user: {
      name: "test",
      email: "test@tes.com",
    },
    idtoken: "ABAC",
    refreshtoken: "123-aba",
    status: "authenticated",
  });

  // create one mock instance, pass options
  const router = createRouterMock();
  beforeEach(() => {
    // inject it globally to ensure `useRoute()`, `$route`, etc work
    // properly and give you access to test specific functions
    injectRouterMock(router);
  });

  test("debe de mostrar el componente correctamente", () => {
    const wrapper = shallowMount(NavbarVue, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("click en logout, debe de cerrar session y redireccionar", async () => {
    const wrapper = shallowMount(NavbarVue, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.find("button").trigger("click");

    expect(store.state.authModule).toEqual({
      user: null,
      status: "not-authenticated",
      idtoken: null,
      refreshtoken: null,
    });

    expect(wrapper.vm.router.push).toHaveBeenCalledWith({ name: "auth-login" });
  });
});
