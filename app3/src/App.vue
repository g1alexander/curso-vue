<template>
  <h1 v-if="authStatus === 'authenticating'">{{ authStatus }}</h1>
  <router-view v-else />
</template>

<script lang="ts">
import { useAuth } from "@/modules/auth/composables/useAuth";

export default {
  setup() {
    const { authStatus, checkAuth } = useAuth();

    checkAuth();

    return { authStatus };
  },
};
</script>
