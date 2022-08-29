import LoginVue from "@/modules/auth/views/Login.vue";
import { shallowMount } from "@vue/test-utils";
import { createVuexStore } from "../../../mocks/mock-store";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import Swal from "sweetalert2";
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}));
describe("test login", () => {
  const store = createVuexStore({
    user: null,
    idtoken: null,
    refreshtoken: null,
    status: "not-authenticated",
  });

  store.dispatch = jest.fn();
  // create one mock instance, pass options
  const router = createRouterMock();
  beforeEach(() => {
    // inject it globally to ensure `useRoute()`, `$route`, etc work
    // properly and give you access to test specific functions
    injectRouterMock(router);
    jest.clearAllMocks();
  });

  test("debe hacer match snap", () => {
    const wrapper = shallowMount(LoginVue, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("login incorrecto dispara swal", async () => {
    (store.dispatch as any).mockReturnValueOnce({ ok: false, message: "f" });
    const wrapper = shallowMount(LoginVue, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.find("form").trigger("submit");

    expect(store.dispatch).toHaveBeenCalledWith("authModule/signInUser", {
      email: "",
      password: "",
    });

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "error",
      text: "f",
      title: "Oops...",
    });
  });

  test("login correcto, dispara redireccionar no-entry", async () => {
    (store.dispatch as any).mockReturnValueOnce({ ok: true, message: "ok" });
    const wrapper = shallowMount(LoginVue, {
      global: {
        plugins: [store],
      },
    });

    const [textEmail, passwordInput] = wrapper.findAll("input");

    await textEmail.setValue("test@test.com");

    await passwordInput.setValue("123456");

    await wrapper.find("form").trigger("submit");

    expect(store.dispatch).toHaveBeenCalledWith("authModule/signInUser", {
      email: "test@test.com",
      password: "123456",
    });

    expect(router.push).toHaveBeenCalledWith({ name: "no-entry" });
  });
});
