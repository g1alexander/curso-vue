<template>
  <div class="d-flex justify-content-center">
    <h1 class="align-self-center">No hay nada seleccionado</h1>
  </div>

  <Fab @on:click="newEntry" />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";

export default defineComponent({
  name: "NoEntrySelected",
  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab.vue")),
  },

  methods: {
    newEntry() {
      this.$router.push("/daybook/new");
    },
  },
});
</script>

<style lang="scss" scoped>
div {
  height: 100%;
}
</style>
