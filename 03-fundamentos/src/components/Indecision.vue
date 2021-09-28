<template>
  <img v-if="img" :src="img" alt="bg" />
  <div class="bg-dark"></div>
  <div class="indecision-container">
    <input v-model="question" type="text" placeholder="Hazme una pregunta" />
    <p>Recuerda terminar con un signo de ?</p>

    <div v-if="isValid">
      <h2>{{ question }}</h2>
      <h1>{{ answer === "yes" ? "Si!" : "No!" }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: "",
      img: null,
      answer: null,
      isValid: false,
    };
  },
  methods: {
    async getWtf() {
      try {
        this.answer = "...pensando";
        const response = await fetch("https://yesno.wtf/api");
        const { answer, image } = await response.json();

        this.answer = answer;
        this.img = image;
      } catch (error) {
        this.answer = "no se pudo cargar el api";
        this.img = null;
        console.error(error);
      }
    },
  },
  watch: {
    question(value, oldValue) {
      // console.log({ value, oldValue });

      this.isValid = false;

      console.log({ value});

      if (!value.includes("?")) return;

      this.isValid = true;

      this.getWtf();
    },
  },
};
</script>

<style scoped>
img,
.bg-dark {
  height: 100vh;
  left: 0px;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  top: 0px;
  width: 100vw;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
  position: relative;
  z-index: 99;
}

input {
  width: 250px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
}
input:focus {
  outline: none;
}

p {
  color: white;
  font-size: 20px;
  margin-top: 0px;
}

h1,
h2 {
  color: white;
}

h2 {
  margin-top: 150px;
}
</style>
