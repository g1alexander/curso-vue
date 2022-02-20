import { JournalState } from "./interface/State";

const state: JournalState = {
  isLoading: true,
  entries: [],
};

export default (): JournalState => ({ ...state });
