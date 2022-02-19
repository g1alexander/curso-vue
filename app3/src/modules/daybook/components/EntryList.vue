<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input
        v-model="term"
        type="text"
        class="form-control"
        placeholder="Buscar entrada"
      />
    </div>

    <div class="entry-scrollarea">
      <Entry v-for="entry in entries" :key="entry.id" :entry="entry" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import { mapGetters } from "vuex";
import { Entry } from "../store/interface/State";

export default defineComponent({
  components: {
    Entry: defineAsyncComponent(
      () => import("@/modules/daybook/components/Entry.vue")
    ),
  },

  data() {
    return {
      term: "",
    };
  },

  computed: {
    ...mapGetters("journalModule", ["getEntriesByTerm"]),

    entries(): Entry[] {
      return this.getEntriesByTerm(this.term);
    },
  },
});
</script>

<style scoped lang="scss">
.entry-list-container {
  border-right: 1px solid #2c3e50;
  height: calc(100vh - 56px);
}
.entry-scrollarea {
  height: calc(100vh - 110px);
  overflow-y: scroll;
}
</style>
