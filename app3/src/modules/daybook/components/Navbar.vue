<template>
  <nav class="navbar bg-primary">
    <a href="navbar-brand">
      <img
        src="@/assets/logo.png"
        alt="logo"
        class="d-inline-block align-text-top mx-2"
        height="24"
      />

      <span class="text-white">{{ username }}</span>
    </a>

    <div class="d-flex">
      <button @click="onLogout" class="btn btn-outline-info mx-2">
        <i class="fa fa-sign-out-alt"></i>
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { useAuth } from "@/modules/auth/composables/useAuth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const { username, logout } = useAuth();

    return {
      username,

      onLogout: () => {
        logout();
        router.push({ name: "auth-login" });
      },
    };
  },
};
</script>
