<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1 class="bg-success">Hola</h1>
    <button @click="getDayBook" class="bg-primary">day</button>
  </div>
</template>

<script>
export default {
  methods: {
    getDayBook() {
      this.$router.push({ name: "daybook" });
    },
  },
};
</script>
