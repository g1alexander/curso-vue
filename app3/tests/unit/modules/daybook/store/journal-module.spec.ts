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

  test("mutation: setEntries", () => {
    const store = createVuexStore({ isLoading: true, entries: [] });

    store.commit("journalModule/setEntries", journalState.entries);

    expect(store.state.journalModule.entries.length).toBe(2);
    expect(store.state.journalModule.isLoading).toBeFalsy();
  });

  test("mutation: updateEntry", () => {
    const store = createVuexStore(journalState);
    // console.log(store.state.journalModule.entries);
    const updateEntry = {
      date: "Tue Feb 22 2022",
      id: "-MwZ3AI4JD9U9p5PJ3ay",
      picture:
        "https://res.cloudinary.com/dlgvxohur/image/upload/v1645577816/journal/mrlu5sfmsyrkcozpyciy.jpg",
      text: "Hola mundo desde prubeas",
    };

    store.commit("journalModule/updateEntry", updateEntry);

    // funciona pero se puede optimizar
    // expect(store.state.journalModule.entries.length).toBe(2);
    // expect(store.state.journalModule.entries[0]).toEqual(updateEntry);

    const storeEntries = store.state.journalModule.entries;

    expect(storeEntries.length).toBe(2);
    expect(storeEntries.find((entry) => entry.id === updateEntry.id)).toEqual(
      updateEntry
    );
  });

  test("mutation: addEntry ", () => {
    const store = createVuexStore(journalState);
    // console.log(store.state.journalModule.entries);
    const addEntry = {
      date: "Tue Feb 22 2022",
      id: "ABC-123",
      picture:
        "https://res.cloudinary.com/dlgvxohur/image/upload/v1645577816/journal/mrlu5sfmsyrkcozpyciy.jpg",
      text: "Hola mundo desde prubeas",
    };
    store.commit("journalModule/addEntry", addEntry);

    const storeEntries = store.state.journalModule.entries;

    expect(storeEntries.find((entry) => entry.id === addEntry.id)).toEqual(
      addEntry
    );
    expect(storeEntries.length).toBe(3);
  });

  test("mutation: deleteEntry ", () => {
    const store = createVuexStore(journalState);
    // console.log(store.state.journalModule.entries);
    const addEntry = {
      date: "Tue Feb 22 2022",
      id: "ABC-123",
      picture:
        "https://res.cloudinary.com/dlgvxohur/image/upload/v1645577816/journal/mrlu5sfmsyrkcozpyciy.jpg",
      text: "Hola mundo desde prubeas",
    };
    store.commit("journalModule/addEntry", addEntry);

    store.commit("journalModule/deleteEntry", addEntry.id);

    const storeEntries = store.state.journalModule.entries;

    expect(storeEntries.length).toBe(2);
    expect(storeEntries.find((entry) => entry.id === addEntry.id)).toBeFalsy();
  });
});
