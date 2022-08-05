// store.ts
import { JournalState } from "@/modules/daybook/store/interface/State";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { journalModule } from "@/modules/daybook/store/";
import { authModule } from "@/modules/auth/store/";
import { AuthState } from "@/modules/auth/store/interface/State";

export interface State {
  journalModule: JournalState;
  authModule: AuthState;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  modules: {
    journalModule,
    authModule,
  },
});

// define your own `useStore` composition function
export function useStore(): Store<State> {
  return baseUseStore(key);
}
