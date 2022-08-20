<template>
  <span class="login100-form-title p-b-41"> Registrar </span>
  <form
    @submit.prevent="onSubmit"
    class="login100-form validate-form p-b-33 p-t-5"
  >
    <div class="wrap-input100 validate-input" data-validate="Enter name">
      <input
        v-model="useForm.name"
        class="input100"
        type="text"
        placeholder="name"
        required
      />
      <span class="focus-input100" data-placeholder="&#xe82a;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Enter username">
      <input
        v-model="useForm.email"
        class="input100"
        type="email"
        placeholder="Correo"
        required
      />
      <span class="focus-input100" data-placeholder="&#xe818;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Enter password">
      <input
        class="input100"
        type="password"
        v-model="useForm.password"
        placeholder="Contraseña"
        required
      />
      <span class="focus-input100" data-placeholder="&#xe80f;"></span>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <button class="login100-form-btn">Register</button>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <router-link :to="{ name: 'auth-login' }">¿tienes cuenta?</router-link>
    </div>
  </form>
</template>

<script lang="ts">
import Swal from "sweetalert2";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";

export default {
  setup() {
    const router = useRouter();
    const { createUser } = useAuth();

    const useForm = ref({
      name: "sdsd",
      email: "gvfgfg@sad.com",
      password: "dasa3s",
    });

    return {
      useForm,
      onSubmit: async () => {
        const { message, ok } = await createUser(useForm.value);

        if (!ok)
          return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: message,
          });

        return router.push({ name: "no-entry" });
      },
    };
  },
};
</script>
