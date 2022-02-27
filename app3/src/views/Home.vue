<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <button @click="goToDaybook" class="btn btn-dark">primary</button>
    <button @click="goToDaybook" class="btn btn-primary">secondary</button>
    <button @click="goToDaybook" class="btn btn-secondary">success</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    goToDaybook() {
      this.$router.push({ name: "no-entry" });
    },
  },
});
</script>
