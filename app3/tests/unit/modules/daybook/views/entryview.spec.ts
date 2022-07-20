import { shallowMount, VueWrapper } from "@vue/test-utils";
import EntryViewVue from "@/modules/daybook/views/EntryView.vue";

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

describe("tests componet EntryView", () => {
  const $router = {
    push: jest.fn(),
  };

  const store = createVuexStore(journalState);

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
});
