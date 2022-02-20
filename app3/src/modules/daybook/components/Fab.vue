<template>
  <button @click="onClick" class="btn btn-primary">
    <i class="fa fa-2x" :class="icon"></i>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: "fa-plus",
    },
  },

  methods: {
    onClick() {
      this.$emit("on:click");
    },
  },
});
</script>

<style lang="scss" scoped>
button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  height: 50px;
  border-radius: 50% !important;
}
</style>
