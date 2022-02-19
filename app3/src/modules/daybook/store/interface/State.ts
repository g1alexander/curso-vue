export interface JournalState {
  isLoading: boolean;
  entries: Entry[];
}

interface Entry {
  id: number;
  date: string;
  text: string;
  picture: string | null;
}
