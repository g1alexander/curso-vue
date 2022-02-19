<template>
  <div
    @click="$router.push({ name: 'entry', params: { id: 1 } })"
    class="entry-container mb-3 pointer p-2"
  >
    <!-- title -->

    <div class="entry-title d-flex">
      <span class="text-success fd-5 fw-bold">15</span>
      <span class="mx-1 fs-5">Julio</span>
      <span class="mx-2 fw-light">2021, jueves</span>
    </div>

    <div class="entry-description">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio accusamus
      numquam autem repudiandae iste, minus minima dolores esse aliquid
      dignissimos deleniti ratione! Ipsum eaque aspernatur officiis molestias
      exercitationem et quae.
    </div>
  </div>
</template>

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
