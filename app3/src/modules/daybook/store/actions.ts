import { journalApi } from "@/api/journalApi";
import { State } from "@/store";
import { ActionContext } from "vuex";
import { Entry, JournalState } from "./interface/State";
import { Entries } from "@/api/interfaces/Entries";
import { EntryAPI } from "@/api/interfaces/EntryApi";
import { AddEntry } from "@/api/interfaces/AddEntry";

type Context = ActionContext<JournalState, State>;

// export const myAction = async (store: Context): Promise<void> => {};

export const loadEntries = async ({ commit }: Context): Promise<void> => {
  const { data } = await journalApi.get<Entries>("/entries.json");

  const entries: Entry[] = [];

  if (data) {
    for (const id of Object.keys(data)) {
      entries.push({
        id,
        ...data[id as keyof Entries],
      });
    }
  }
  commit("setEntries", entries);
};

export const updateEntry = async (
  { commit }: Context,
  entry: Entry
): Promise<void> => {
  const { date, picture, text } = entry;

  const dataSave: {
    id?: string;
    date: string;
    picture: string | null;
    text: string;
  } = {
    date,
    picture,
    text,
  };

  const { data } = await journalApi.put<EntryAPI>(
    `/entries/${entry.id}.json`,
    dataSave
  );

  dataSave.id = entry.id;

  commit("updateEntry", { ...dataSave });
};

export const createEntry = async (
  { commit }: Context,
  entry: Entry
): Promise<string> => {
  const { date, picture, text } = entry;

  const { data } = await journalApi.post<AddEntry>(`/entries.json`, {
    date,
    picture,
    text,
  });
  commit("addEntry", { id: data.name, date, picture, text });

  return data.name;
};

export const deleteEntry = async (
  { commit }: Context,
  id: string
): Promise<void> => {
  const { status } = await journalApi.delete(`/entries/${id}.json`);

  if (status === 200) {
    commit("deleteEntry", id);
  }
};
