<template>
  <div
    @click="$router.push({ name: 'entry', params: { id: entry.id } })"
    class="entry-container mb-3 pointer p-2"
  >
    <!-- title -->

    <div class="entry-title d-flex">
      <span class="text-success fd-5 fw-bold">{{ day }}</span>
      <span class="mx-1 fs-5">{{ mouth }}</span>
      <span class="mx-2 fw-light">{{ yearDay }}</span>
    </div>

    <div class="entry-description">
      {{ shortText }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Entry } from "../store/interface/State";
import { days, months } from "../utils/datesArray";

export default defineComponent({
  props: {
    entry: {
      type: Object as PropType<Entry>,
      required: true,
    },
  },

  computed: {
    shortText() {
      return this.entry.text.length > 130
        ? this.entry.text.substring(0, 130) + "..."
        : this.entry.text;
    },

    day() {
      const date = new Date(this.entry.date);
      return date.getDate();
    },

    mouth() {
      const date = new Date(this.entry.date);
      return months[date.getMonth()];
    },

    yearDay() {
      const date = new Date(this.entry.date);
      return `${date.getFullYear()}, ${days[date.getDay()]}`;
    },
  },
});
</script>

<style lang="scss">
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2s all ease-in;

  &:hover {
    background-color: lighten($color: gray, $amount: 45);
    transition: 0.2s all ease-in;
  }

  .entry-description {
    font-size: 0.8rem;
    color: #2c3e50;
  }
}
</style>
