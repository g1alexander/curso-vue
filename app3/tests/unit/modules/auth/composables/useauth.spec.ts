import { useAuth } from "@/modules/auth/composables/useAuth";
const mockStore = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: {
    "authModule/currentState": "authenticated",
    "authModule/username": "test",
  },
};

jest.mock("vuex", () => ({
  useStore: () => mockStore,
}));

describe("pruebas useAuth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createUser exitoso", async () => {
    const { createUser } = useAuth();

    const newUser = {
      name: "test",
      email: "test@tes.com",
      password: "123456",
    };

    mockStore.dispatch.mockReturnValue({ ok: true });

    const resp = await createUser(newUser);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "authModule/createUser",
      newUser
    );

    expect(resp).toEqual({ ok: true });
  });

  test("createUser fallido (usuario ya existe)", async () => {
    const { createUser } = useAuth();

    const newUser = {
      name: "test",
      email: "gvfgfg@sad.com",
      password: "123456",
    };

    mockStore.dispatch.mockReturnValue({ ok: false, message: "EMAIL_EXISTS" });

    const resp = await createUser(newUser);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "authModule/createUser",
      newUser
    );

    expect(resp).toEqual({ ok: false, message: "EMAIL_EXISTS" });
  });

  test("login exitoso", async () => {
    const { loginUser } = useAuth();

    const loginForm = {
      email: "gvfgfg@sad.com",
      password: "123456",
    };

    mockStore.dispatch.mockReturnValue({ ok: true, message: "ok" });

    const resp = await loginUser(loginForm);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "authModule/signInUser",
      loginForm
    );

    expect(resp).toEqual({ ok: true, message: "ok" });
  });

  test("login fallido", async () => {
    const { loginUser } = useAuth();

    const loginForm = {
      email: "gvfgfg@sad.com",
      password: "0000",
    };

    mockStore.dispatch.mockReturnValue({
      ok: false,
      message: "EMAIL/PASSWORD do not exist",
    });

    const resp = await loginUser(loginForm);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "authModule/signInUser",
      loginForm
    );

    expect(resp).toEqual({ ok: false, message: "EMAIL/PASSWORD do not exist" });
  });

  test("checkStatus", async () => {
    const { checkAuth } = useAuth();

    mockStore.dispatch.mockReturnValue({ ok: true });

    const resp = await checkAuth();

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "authModule/checkAuthentication"
    );

    expect(resp).toEqual({ ok: true });
  });

  test("logout", () => {
    const { logout } = useAuth();

    logout();

    expect(mockStore.commit).toHaveBeenCalledWith("authModule/logout");
    expect(mockStore.commit).toHaveBeenCalledWith("journalModule/clearEntries");
  });

  test("computed: authStatus, username", () => {
    const { authStatus, username } = useAuth();

    expect(authStatus.value).toBe("authenticated");

    expect(username.value).toBe("test");
  });
});
