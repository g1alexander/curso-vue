<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fd-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
      </div>

      <div>
        <button class="btn btn-danger mx-2">
          Borrar <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary mx-2">
          Subir <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>

    <hr />

    <div class="d-flex flex-column w-100 px-3 h-75">
      <textarea v-model="entry.text" placeholder="¿Que sucedió hoy?"></textarea>
    </div>

    <img
      src="https://images.unsplash.com/photo-1645241910531-d32735b412a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
      class="img-thumbanail"
    />
  </template>
  <Fab icon="fa-save" @on:click="saveEntry" />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { getDate } from "../helpers/getDate";
import { Entry } from "../store/interface/State";

export default defineComponent({
  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab.vue")),
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters("journalModule", ["getEntryById"]),

    day() {
      const { day } = getDate(this.entry.date);
      return day;
    },

    month() {
      const { month } = getDate(this.entry.date);
      return month;
    },

    yearDay() {
      const { yearDay } = getDate(this.entry.date);
      return yearDay;
    },
  },

  data() {
    return {
      entry: {} as Entry,
    };
  },

  methods: {
    ...mapActions("journalModule", ["updateEntry", "createEntry"]),
    loadEntry() {
      let entry: Entry;

      if (this.id === "new") {
        entry = {
          id: "",
          text: "",
          date: new Date().toDateString(),
          picture: "",
        };
      } else {
        entry = this.getEntryById(this.id);
        if (!entry) return this.$router.push({ name: "no-entry" });
      }
      this.entry = entry;
    },

    async saveEntry() {
      if (this.entry.id) {
        await this.updateEntry(this.entry);
      } else {
        const id = await this.createEntry(this.entry);

        this.$router.push({ name: "entry", params: { id } });
      }
    },
  },

  created() {
    this.loadEntry();
  },

  watch: {
    id() {
      this.loadEntry();
    },
  },
});
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  height: 100%;
  border: none;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000, $alpha: 0.2);
}
</style>
