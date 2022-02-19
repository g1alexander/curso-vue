import { JournalState, Entry } from "./interface/State";

// export const myGetters = (state: JournalState) => {return};

export const getEntriesByTerm =
  (state: JournalState) =>
  (term = ""): Entry[] => {
    if (term.length === 0) return state.entries;

    return state.entries.filter((entry) =>
      entry.text.toLowerCase().includes(term.toLocaleLowerCase())
    );
  };

export const getEntryById =
  (state: JournalState) =>
  (id: string): Entry | undefined => {
    const entry = state.entries.find((entry) => entry.id === id);

    return entry && JSON.parse(JSON.stringify(entry));
  };
