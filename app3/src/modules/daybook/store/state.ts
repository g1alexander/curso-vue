import { JournalState } from "./interface/State";

const state: JournalState = {
  isLoading: true,
  entries: [
    {
      id: "1",
      date: new Date().toDateString(),
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, assumenda reiciendis. Eaque voluptates magnam maiores nesciunt? Facilis reiciendis officia est esse ex eum exercitationem, ipsam voluptatibus laudantium delectus facere? Impedit.",
      picture: null,
    },
    {
      id: "2",
      date: new Date().toDateString(),
      text: "consectetur adipisicing elit. Unde, assumenda reiciendis. Eaque voluptates magnam maiores nesciunt? Facilis reiciendis officia est esse ex eum exercitationem, ipsam voluptatibus laudantium delectus facere? Impedit.",
      picture: null,
    },
    {
      id: "3",
      date: new Date().toDateString(),
      text: "tonsectetur adipisicing elit. Unde, assumenda reiciendis. Eaque voluptates magnam maiores nesciunt? Facilis reiciendis officia est esse ex eum exercitationem, ipsam voluptatibus laudantium delectus facere? Impedit.",
      picture: null,
    },
  ],
};

export default (): JournalState => ({ ...state });
