import { usePlacesStore } from "@/composables";
import { ref, computed } from "vue";
import SearchResults from "../search-results/SearchResults.vue";
export default {
  components: {
    SearchResults,
  },
  setup() {
    const debounceTimeout = ref();
    const debounceValue = ref("");

    const { searchByTerm } = usePlacesStore();

    return {
      debounceValue,

      searchTerm: computed<string>({
        get() {
          return debounceValue.value;
        },
        set(val: string) {
          if (debounceTimeout.value) clearTimeout(debounceTimeout.value);

          debounceTimeout.value = setTimeout(async () => {
            debounceValue.value = val;

            await searchByTerm(val);
          }, 500);
        },
      }),
    };
  },
};
