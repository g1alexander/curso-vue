import type { ActionTree } from "vuex";
import type { PlacesState } from "./state";
import type { StateInterface } from "../index";

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
};

export default actions;
