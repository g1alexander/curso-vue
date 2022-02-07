import axios, { type AxiosInstance } from "axios";

//TODO: TAMBIEN SE PUEDE CONFIGURAR EL TOKEN ACA!!!

export const pokemonApi: AxiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});
