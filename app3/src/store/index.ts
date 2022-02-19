// store.ts
import { JournalState } from "@/modules/daybook/store/interface/State";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { journalModule } from "@/modules/daybook/store/";

export interface State {
  journalModule: JournalState;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  modules: {
    journalModule,
  },
});

// define your own `useStore` composition function
export function useStore(): Store<State> {
  return baseUseStore(key);
}
