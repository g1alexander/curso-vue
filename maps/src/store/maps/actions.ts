import type { ActionTree } from "vuex";
import type { mapState } from "./state";
import type { StateInterface } from "../index";
import { directionApi } from "@/apis";
import type { DirectionsResponse } from "../../interfaces/Directions";

export type LngLat = [number, number];

const actions: ActionTree<mapState, StateInterface> = {
  async getRouteBetweenPoints(
    { commit },
    { start, end }: { start: LngLat; end: LngLat }
  ) {
    const resp = await directionApi.get<DirectionsResponse>(
      `${start.join(",")};${end.join(",")}`
    );

    commit("setDistanceDuration", {
      distance: resp.data.routes[0].distance,
      duration: resp.data.routes[0].duration,
    });

    commit("setRoutePolyline", resp.data.routes[0].geometry.coordinates);
  },
};

export default actions;
