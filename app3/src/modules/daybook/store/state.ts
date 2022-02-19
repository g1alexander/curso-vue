import { JournalState } from "./interface/State";

const state: JournalState = {
  isLoading: true,
  entries: [1, 2, 3, 4, 5],
};

export default (): JournalState => ({ ...state });
