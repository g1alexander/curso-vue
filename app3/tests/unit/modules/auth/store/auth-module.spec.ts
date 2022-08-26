import { createVuexStore } from "../../../mocks/mock-store";

describe("vuex: pruebas auth-module", () => {
  test("estado inicial", () => {
    const store = createVuexStore({
      status: "authenticating",
      user: null,
      idtoken: null,
      refreshtoken: null,
    });

    const { idtoken, refreshtoken, status, user } = store.state.authModule;

    expect(status).toBe("authenticating");
    expect(idtoken).toBe(null);
    expect(refreshtoken).toBe(null);
    expect(user).toBe(null);
  });

  //mutations

  test("mutation: loginUser ", () => {
    const store = createVuexStore({
      status: "authenticating",
      user: null,
      idtoken: null,
      refreshtoken: null,
    });

    const payload = {
      user: { email: "adc@adc.com", name: "hola" },
      idToken: "ABC-123",
      refreshToken: "XYZ-123",
    };

    store.commit("authModule/loginUser", payload);

    const { idtoken, refreshtoken, status, user } = store.state.authModule;

    expect(status).toBe("authenticated");
    expect(idtoken).toBe("ABC-123");
    expect(refreshtoken).toBe("XYZ-123");
    expect(user).toEqual({ email: "adc@adc.com", name: "hola" });
  });

  test("mutation: logout", () => {
    localStorage.setItem("idToken", "ABC-123");
    localStorage.setItem("refreshToken", "XYZ-123");

    const store = createVuexStore({
      status: "authenticated",
      user: { email: "adc@adc.com", name: "hola" },
      idtoken: "ABC-123",
      refreshtoken: "XYZ-123",
    });

    store.commit("authModule/logout");

    const { idtoken, refreshtoken, status, user } = store.state.authModule;

    expect(status).toBe("not-authenticated");
    expect(idtoken).toBe(null);
    expect(refreshtoken).toBe(null);
    expect(user).toBe(null);

    expect(localStorage.getItem("idToken")).toBe(null);
    expect(localStorage.getItem("refreshToken")).toBe(null);
  });
});
