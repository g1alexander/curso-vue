import { State } from "@/store";
import { ActionContext } from "vuex";
import { JournalState } from "./interface/State";

type Context = ActionContext<JournalState, State>;

// export const myAction = async (store: Context): Promise<void> => {};

export const loadEntries = async ({ commit }: Context): Promise<void> => {
  // console.log(store);
};

export const updateEntry = async ({ commit }: Context): Promise<void> => {
  // console.log(store);
};

export const createEntry = async ({ commit }: Context): Promise<void> => {
  // console.log(store);
};
