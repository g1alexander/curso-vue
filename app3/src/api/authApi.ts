import axios from "axios";

export const authApi = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",

  params: {
    key: "AIzaSyCJyxqVa2p6CJ9tA4bwsAARL-LwYmFoqZ0",
  },
});
