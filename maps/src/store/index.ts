import { createStore } from "vuex";

// My custom modules
import placesModule from "./places";
import mapModule from "./maps";
import type { PlacesState } from "./places/state";
import type { mapState } from "./maps/state";

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  placesModule: PlacesState;
  mapModule: mapState;
}

export default createStore<StateInterface>({
  modules: {
    placesModule,
    mapModule,
  },
});
