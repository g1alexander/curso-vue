import { shallowMount, VueWrapper } from "@vue/test-utils";
import EntryViewVue from "@/modules/daybook/views/EntryView.vue";

import { createStore } from "vuex";
import { journalModule } from "@/modules/daybook/store";
import { JournalState } from "@/modules/daybook/store/interface/State";
import { journalState } from "../../../mocks/journal-state";
import Swal from "sweetalert2";

const createVuexStore = (initialState: JournalState) =>
  createStore({
    modules: {
      journalModule: {
        ...journalModule,
        state: { ...initialState },
      },
    },
  });

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}));

const mockSwal = Swal as jest.Mocked<typeof Swal>;

describe("tests componet EntryView", () => {
  const $router = {
    push: jest.fn(),
  };

  const store = createVuexStore(journalState);

  store.dispatch = jest.fn();

  let wrapper = shallowMount(EntryViewVue, {
    props: { id: "-MwZ3AI4JD9U9p5PJ3ay" },
    global: { plugins: [store], mocks: { $router } },
  });

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = shallowMount(EntryViewVue, {
      props: { id: "-MwZ3AI4JD9U9p5PJ3ay" },
      global: { plugins: [store], mocks: { $router } },
    });
  });

  test("debe de sacar al usuario si no esta el id", () => {
    const wrapper = shallowMount(EntryViewVue, {
      props: { id: "NO EXISTE" },
      global: { plugins: [store], mocks: { $router } },
    });

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: "no-entry" });
  });

  test("debe de mostrar la entrada correctamente", () => {
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm.$router.push).not.toHaveBeenCalled();
  });

  test("debe de borrar la entrada y salir", (done) => {
    mockSwal.fire.mockReturnValueOnce(
      Promise.resolve({
        isConfirmed: true,
        isDenied: false,
        isDismissed: false,
      })
    );

    const btn = wrapper.find(".btn-danger");

    btn.trigger("click");

    expect(mockSwal.fire).toHaveBeenCalledWith({
      showDenyButton: true,
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      confirmButtonText: "Sí, borrar",
    });

    setTimeout(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        "journalModule/deleteEntry",
        "-MwZ3AI4JD9U9p5PJ3ay"
      );
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
        name: "no-entry",
      });

      done();
    }, 1);
  });
});
