<template>
  <NavBar />
  <main class="d-flex">
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

export default defineComponent({
  components: {
    NavBar: defineAsyncComponent(
      () => import("@/modules/daybook/components/Navbar.vue")
    ),
    EntryList: defineAsyncComponent(
      () => import("@/modules/daybook/components/EntryList.vue")
    ),
  },
});
</script>
r
