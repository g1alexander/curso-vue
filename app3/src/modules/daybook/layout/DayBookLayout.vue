<template>
  <NavBar />

  <section v-if="isLoading" class="row justify-content-md-center">
    <div class="col-3 alert-info text-center mt-5">
      Cargando...
      <h3 class="mt-2">
        <i class="fa fa-spin fa-sync"></i>
      </h3>
    </div>
  </section>

  <main v-else class="d-flex">
    <aside class="col-4">
      <EntryList />
    </aside>

    <section class="col">
      <router-view />
    </section>
  </main>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  components: {
    NavBar: defineAsyncComponent(
      () => import("@/modules/daybook/components/Navbar.vue")
    ),
    EntryList: defineAsyncComponent(
      () => import("@/modules/daybook/components/EntryList.vue")
    ),
  },

  computed: {
    ...mapState("journalModule", ["isLoading"]),
  },

  methods: {
    ...mapActions("journalModule", ["loadEntries"]),
  },

  created() {
    this.loadEntries();
  },
});
</script>
r
