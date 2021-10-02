<template>
  <div class="entry-container pointer mb-3 p-2">
    <section class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">15</span
      ><span class="mx-1 fs-5">Julio</span
      ><span class="mx-2 fw-light">2021, Jueves</span>
    </section>

    <section class="entry-description">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae architecto
      voluptates dicta quibusdam atque nobis repellat eum, aspernatur optio,
      ducimus corporis, error aperiam? Quibusdam ratione laboriosam suscipit, a
      provident quia!
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2s all ease-in;

  &:hover {
    background-color: lighten($color: gray, $amount: 45%);
  }

  .entry-description {
    font-size: 12px;
  }
}
</style>
