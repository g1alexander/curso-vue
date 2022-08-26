import { journalModule } from "@/modules/daybook/store";
import { createStore } from "vuex";
import { authModule } from "@/modules/auth/store/index";
import { journalState } from "./journal-state";
import { AuthState } from "@/modules/auth/store/interface/State";

const createVuexStore = (
  authInitialState: AuthState,
  journalInitialState = journalState
) =>
  createStore({
    modules: {
      journalModule: {
        ...journalModule,
        state: { ...journalInitialState },
      },
      authModule: {
        ...authModule,
        state: { ...authInitialState },
      },
    },
  });

export default createVuexStore;
