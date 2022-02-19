<template>
  <div class="entry-title d-flex justify-content-between p-2">
    <div>
      <span class="text-success fd-3 fw-bold">15</span>
      <span class="mx-1 fs-3">Julio</span>
      <span class="mx-2 fs-4 fw-light">2021, jueves</span>
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
    <textarea placeholder="¿Que sucedió hoy?"></textarea>
  </div>

  <Fab icon="fa-save" />

  <img
    src="https://images.unsplash.com/photo-1645241910531-d32735b412a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
    class="img-thumbanail"
  />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";

export default defineComponent({
  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab.vue")),
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
