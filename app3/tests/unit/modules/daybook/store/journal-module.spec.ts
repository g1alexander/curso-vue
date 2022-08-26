import { createStore } from "vuex";
import { journalModule } from "@/modules/daybook/store";
import { journalState } from "../../../mocks/journal-state";
import { JournalState } from "@/modules/daybook/store/interface/State";
import { authApi } from "@/api/authApi";

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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    const { data } = await authApi.post(":signInWithPassword", {
      email: "test@test.com",
      password: 123456,
      returnSecureToken: true,
    });

    localStorage.setItem("idToken", data.idToken);
  });

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

  // GETTERS ===============

  test("getters: getEntriesByTerm getEntryById", () => {
    const store = createVuexStore(journalState);

    const [entry1, entry2] = journalState.entries;

    expect(store.getters["journalModule/getEntriesByTerm"]("").length).toBe(2);
    expect(store.getters["journalModule/getEntriesByTerm"]("soy").length).toBe(
      1
    );

    expect(store.getters["journalModule/getEntriesByTerm"]("soy")).toEqual([
      entry2,
    ]);

    expect(
      store.getters["journalModule/getEntryById"]("-MwZ3AI4JD9U9p5PJ3ay")
    ).toEqual(entry1);
  });

  // ACTIONS ===============

  test("actions: loadEntries", async () => {
    const store = createVuexStore({ isLoading: true, entries: [] });

    await store.dispatch("journalModule/loadEntries");

    expect(store.state.journalModule.entries.length).toBe(2);
  });

  test("actions: updateEntry", async () => {
    const store = createVuexStore(journalState);

    const updatedEntry = {
      date: "Tue Feb 26 2023",
      id: "-MwZ3AI4JD9U9p5PJ3ay",
      picture:
        "https://res.cloudinary.com/dlgvxohur/image/upload/v1645577816/journal/mrlu5sfmsyrkcozpyciy.jpg",
      text: "update entrada 1 mock",
      otroCampo: true,
      otroMas: "hola",
    };

    await store.dispatch("journalModule/updateEntry", updatedEntry);

    expect(store.state.journalModule.entries.length).toBe(2);

    expect(
      store.state.journalModule.entries.find((e) => e.id === updatedEntry.id)
    ).toEqual({
      date: "Tue Feb 26 2023",
      id: "-MwZ3AI4JD9U9p5PJ3ay",
      picture:
        "https://res.cloudinary.com/dlgvxohur/image/upload/v1645577816/journal/mrlu5sfmsyrkcozpyciy.jpg",
      text: "update entrada 1 mock",
    });
  });

  test("actions: createEntry deleteEntry", async () => {
    const store = createVuexStore(journalState);
    const newEntry = {
      date: "Tue Mar 30 2022",
      text: "nueva entrada desde mock",
      picture: null,
    };
    const id = await store.dispatch("journalModule/createEntry", newEntry);

    expect(typeof id).toBe("string");
    expect(store.state.journalModule.entries.length).toBe(3);

    expect(
      store.state.journalModule.entries.find((e) => e.id === id)
    ).toBeTruthy();

    await store.dispatch("journalModule/deleteEntry", id);

    expect(
      store.state.journalModule.entries.find((e) => e.id === id)
    ).toBeFalsy();
  });
});
