import type { ActionTree } from "vuex";
import type { PlacesState } from "./state";
import type { StateInterface } from "../index";
import { searchApi } from "@/apis";
import type { PlacesResponse } from "@/interfaces/Places";
import type { Feature } from "../../interfaces/Places";

const actions: ActionTree<PlacesState, StateInterface> = {
  getInitialLocation({ commit }) {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        return commit("setLngLat", {
          lng: coords.longitude,
          lat: coords.latitude,
        });
      },
      (err) => {
        console.log(err);

        throw new Error("no F");
      }
    );
  },

  async searchPlacesByTerm(
    { commit, state },
    query: string
  ): Promise<Feature[]> {
    if (query.length === 0) {
      commit("setPlaces", []);
      return [];
    }

    if (!state.userLocation) {
      throw new Error("no hay ubicacion");
    }

    commit("setIsLoadingPlaces", true);

    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation?.join(","),
      },
    });

    commit("setPlaces", resp.data.features);

    return resp.data.features;
  },
};

export default actions;
