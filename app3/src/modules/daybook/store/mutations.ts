import { Entry, JournalState } from "./interface/State";

// export const myMutations = (state: JournalState):void => {};

export const setEntries = (state: JournalState, entries: Entry[]): void => {
  state.entries = [...state.entries, ...entries];
  state.isLoading = false;
};

export const updateEntry = (state: JournalState, entryData: Entry): void => {
  const entries = state.entries.filter((entry) => entry.id !== entryData.id);

  state.entries = [entryData, ...entries];
};

export const addEntry = (state: JournalState, entry: Entry): void => {
  state.entries = [entry, ...state.entries];
};
