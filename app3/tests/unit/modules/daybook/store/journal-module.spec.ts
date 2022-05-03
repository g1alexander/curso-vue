import { createStore } from "vuex";
import { journalModule } from "@/modules/daybook/store";
import { journalState } from "../../../mocks/journal-state";
import { JournalState } from "@/modules/daybook/store/interface/State";

const createVuexStore = (initialState: JournalState) =>
  createStore({
    modules: {
      journalModule: {
        ...journalModule,
        state: initialState,
      },
    },
  });

describe("vuex - pruebas en el journal module", () => {
  test("este es el estado inicial, debe tener este estado", () => {
    const store = createVuexStore(journalState);
    const { isLoading, entries } = store.state.journalModule;

    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });
});
