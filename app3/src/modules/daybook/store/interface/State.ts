export interface JournalState {
  isLoading: boolean;
  entries: Entry[];
}

export interface Entry {
  id: string;
  date: string;
  text: string;
  picture: string | null;
}
