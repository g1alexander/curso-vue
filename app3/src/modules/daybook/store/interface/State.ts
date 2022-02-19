export interface JournalState {
  isLoading: boolean;
  entries: Entry[];
}

export interface Entry {
  id: number;
  date: string;
  text: string;
  picture: string | null;
}
