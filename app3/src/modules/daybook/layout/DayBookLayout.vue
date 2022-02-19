<template>
  <NavBar />
  <main>
    <aside>
      <EntryList />
    </aside>

    <section>
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
