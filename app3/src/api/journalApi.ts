import axios from "axios";

export const journalApi = axios.create({
  baseURL: "https://vue-demos-dffdc-default-rtdb.firebaseio.com",
});

journalApi.interceptors.request.use((config) => {
  config.params = {
    auth: localStorage.getItem("idToken"),
  };

  return config;
});
