<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input type="text" class="form-control" placeholder="Buscar entrada" />
    </div>

    <div class="entry-scrollarea mt-1">
      <h2 v-for="item in 50" :key="item"><Entry /></h2>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    Entry: defineAsyncComponent(() => import("./Entry")),
  },
};
</script>

<style lang="scss" scoped>
.entry-list-container {
  border-radius: 1px solid #2c3e50;
  height: calc(100vh - 56px);
}

.entry-scrollarea {
  height: calc(100vh - 120px);
  overflow-y: scroll;
}
</style>
