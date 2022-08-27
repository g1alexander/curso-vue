import { useAuth } from "@/modules/auth/composables/useAuth";
const mockStore = {
  dispatch: jest.fn(),
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

    expect(mockStore.dispatch).toHaveBeenCalledWith("authModule/createUser", {
      email: "test@tes.com",
      name: "test",
      password: "123456",
    });

    expect(resp).toEqual({ ok: true });
  });
});
