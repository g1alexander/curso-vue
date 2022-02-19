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

export const getEntryById = (state: JournalState): string => {
  return "";
};
