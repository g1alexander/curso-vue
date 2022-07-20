import { shallowMount, VueWrapper } from "@vue/test-utils";
import EntryListVue from "@/modules/daybook/components/EntryList.vue";

import { createStore } from "vuex";
import { journalModule } from "@/modules/daybook/store";
import { JournalState } from "@/modules/daybook/store/interface/State";
import { journalState } from "../../../mocks/journal-state";

const createVuexStore = (initialState: JournalState) =>
  createStore({
    modules: {
      journalModule: {
        ...journalModule,
        state: { ...initialState },
      },
    },
  });

describe("tests componet EntryList", () => {
  const $router = {
    push: jest.fn(),
  };

  const store = createVuexStore(journalState);

  let wrapper = shallowMount(EntryListVue, {
    global: { plugins: [store], mocks: { $router } },
  });

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = shallowMount(EntryListVue, {
      global: { plugins: [store], mocks: { $router } },
    });
  });

  test("debe llamar el getEntriesByTerm sin termino y mostrar 2 entradas", () => {
    expect(wrapper.findAll("entry-stub").length).toBe(2);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe de llamar el getEntriesByTerm y filtrar las entradas", async () => {
    const input = wrapper.find("input");

    await input.setValue("soy");

    expect(wrapper.findAll("entry-stub").length).toBe(1);
  });

  test("el boton de nuevo debe de redireccionar a /new", () => {
    const btn = wrapper.find("button");

    btn.trigger("click");

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: "entry",
      params: { id: "new" },
    });
  });
});
