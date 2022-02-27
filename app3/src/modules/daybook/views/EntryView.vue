<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fd-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
      </div>

      <div>
        <button
          v-if="entry.id"
          @click="onDeleteEntry"
          class="btn btn-danger mx-2"
        >
          Borrar <i class="fa fa-trash-alt"></i>
        </button>

        <input
          ref="imageSelector"
          type="file"
          @change="onSelectedImage"
          v-show="false"
        />

        <button @click="onSelectImage" class="btn btn-primary mx-2">
          Subir <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>

    <hr />

    <div class="d-flex flex-column w-100 px-3 h-75">
      <textarea v-model="entry.text" placeholder="¿Que sucedió hoy?"></textarea>
    </div>

    <img
      v-if="entry.picture && !localImage"
      :src="entry.picture"
      class="img-thumbanail"
    />
    <img v-if="localImage" :src="localImage" class="img-thumbanail" />
  </template>
  <Fab icon="fa-save" @on:click="saveEntry" />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { getDate } from "../helpers/getDate";
import { Entry } from "../store/interface/State";
import Swal from "sweetalert2";
import { uploadImage } from "@/modules/daybook/helpers/uploadImage";

export default defineComponent({
  name: "EntryView",
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
      localImage: null as string | null,
      file: new File([], ""),
    };
  },

  methods: {
    ...mapActions("journalModule", [
      "updateEntry",
      "createEntry",
      "deleteEntry",
    ]),
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
      Swal.fire({
        title: "Guardando...",
        allowOutsideClick: false,
      });
      Swal.showLoading();

      const url = await uploadImage(this.file);

      if (url) {
        this.entry.picture = url;
      }

      if (this.entry.id) {
        await this.updateEntry(this.entry);
      } else {
        const id = await this.createEntry(this.entry);
        this.$router.push({ name: "entry", params: { id } });
      }

      Swal.fire("Guardado", "", "success");

      this.localImage = null;
    },

    async onDeleteEntry() {
      const confirm = await Swal.fire({
        showDenyButton: true,
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        confirmButtonText: "Sí, borrar",
      });

      if (confirm.isConfirmed) {
        Swal.fire({
          title: "Eliminando...",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        await this.deleteEntry(this.entry.id);
        this.$router.push({ name: "no-entry" });

        Swal.fire("Eliminado", "", "success");
      }
    },

    onSelectedImage(event: Event) {
      const target = event.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];

      if (!file) {
        this.localImage = null;
        this.file = new File([], "");
        return;
      }
      const fr = new FileReader();

      fr.onload = () => (this.localImage = fr.result as string);
      fr.readAsDataURL(file);

      this.file = file;
    },

    onSelectImage() {
      const input = this.$refs.imageSelector as HTMLInputElement;

      input.click();
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
