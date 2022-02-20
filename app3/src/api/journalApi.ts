import axios from "axios";

export const journalApi = axios.create({
  baseURL: "https://vue-demos-dffdc-default-rtdb.firebaseio.com",
});
