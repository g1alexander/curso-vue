<template>
  <span class="login100-form-title p-b-41"> Ingresar </span>
  <form
    @submit.prevent="onSubmit"
    class="login100-form validate-form p-b-33 p-t-5"
  >
    <div class="wrap-input100 validate-input" data-validate="Enter username">
      <input
        v-model="useForm.email"
        class="input100"
        type="text"
        placeholder="Correo"
        required
      />
      <span class="focus-input100" data-placeholder="&#xe82a;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Enter password">
      <input
        class="input100"
        type="password"
        placeholder="Contraseña"
        v-model="useForm.password"
        required
      />
      <span class="focus-input100" data-placeholder="&#xe80f;"></span>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <button type="submit" class="login100-form-btn">Login</button>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <router-link :to="{ name: 'auth-register' }"
        >¿No tienes cuenta?</router-link
      >
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
    const { loginUser } = useAuth();

    const useForm = ref({
      email: "gvfgfg@sad.com",
      password: "dasa3s",
    });

    return {
      useForm,
      onSubmit: async () => {
        const { message, ok } = await loginUser(useForm.value);

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
