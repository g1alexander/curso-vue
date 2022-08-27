import { authApi } from "@/api/authApi";
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

  test("getters: currentState username", () => {
    const store = createVuexStore({
      status: "authenticated",
      user: { email: "adc@adc.com", name: "hola" },
      idtoken: "ABC-123",
      refreshtoken: "XYZ-123",
    });

    expect(store.getters["authModule/currentState"]).toBe("authenticated");
    expect(store.getters["authModule/username"]).toBe("hola");
  });

  test("actions: createUser - Error usuario ya existe", async () => {
    const store = createVuexStore({
      status: "not-authenticated",
      user: null,
      idtoken: null,
      refreshtoken: null,
    });

    const newUser = {
      email: "gvfgfg@sad.com",
      password: 123456,
      name: "test user",
    };

    const resp = await store.dispatch("authModule/createUser", newUser);

    expect(resp).toEqual({ ok: false, message: "EMAIL_EXISTS" });

    const { idtoken, refreshtoken, status, user } = store.state.authModule;

    expect(status).toBe("not-authenticated");
    expect(idtoken).toBe(null);
    expect(refreshtoken).toBe(null);
    expect(user).toBe(null);
  });

  test("actions: createUser  signInUser - usuario creado", async () => {
    const store = createVuexStore({
      status: "not-authenticated",
      user: null,
      idtoken: null,
      refreshtoken: null,
    });

    const newUser = {
      email: "test2@test.com",
      password: 123456,
      name: "test user",
    };

    //signIn

    await store.dispatch("authModule/signInUser", {
      email: "test2@test.com",
      password: "123456",
    });

    const { idtoken } = store.state.authModule;

    //borrar usuario

    await authApi.post(":delete", {
      idToken: idtoken,
    });

    // crear usuario

    const response = await store.dispatch("authModule/createUser", newUser);

    expect(response).toEqual({ ok: true, message: "ok" });

    const {
      status,
      user,
      idtoken: Token,
      refreshtoken,
    } = store.state.authModule;

    expect(status).toBe("authenticated");
    expect(user).toEqual({ email: "test2@test.com", name: "test user" });
    expect(typeof refreshtoken).toBe("string");
    expect(typeof Token).toBe("string");
  });

  test("actions: checkAuthentication - POSITIVA", async () => {
    const store = createVuexStore({
      status: "not-authenticated",
      user: null,
      idtoken: null,
      refreshtoken: null,
    });

    await store.dispatch("authModule/signInUser", {
      email: "test@test.com",
      password: "123456",
    });

    const { idtoken } = store.state.authModule;

    store.commit("authModule/logout");

    localStorage.setItem("idToken", idtoken || "");

    const response = await store.dispatch("authModule/checkAuthentication");

    const { status, user, idtoken: Token } = store.state.authModule;

    expect(response).toEqual({ ok: true, message: "meloo" });

    expect(status).toBe("authenticated");
    expect(user).toEqual({ name: "user test", email: "test@test.com" });
    expect(typeof Token).toBe("string");
  });

  test("actions: checkAuthentication - NEGATIVA", async () => {
    const store = createVuexStore({
      status: "authenticating",
      user: null,
      idtoken: null,
      refreshtoken: null,
    });

    localStorage.removeItem("idToken");

    const response1 = await store.dispatch("authModule/checkAuthentication");

    expect(response1).toEqual({ ok: false, message: "no hay token" });
    expect(store.state.authModule.status).toBe("not-authenticated");

    localStorage.setItem("idToken", "ABC-123");
    store.state.authModule.status = "authenticating";

    const response2 = await store.dispatch("authModule/checkAuthentication");

    expect(response2).toEqual({ ok: false, message: "INVALID_ID_TOKEN" });
    expect(store.state.authModule.status).toBe("not-authenticated");
  });
});
