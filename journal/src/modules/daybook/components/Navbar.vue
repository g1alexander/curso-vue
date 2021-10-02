<template>
  <nav class="bg-primary navbar">
    <router-link to="/" class="navbar-brand text-white">
      <img
        src="@/assets/logo.png"
        alt="vue"
        class="d-inline-block align-text-top mx-2"
        height="24"
      />
      Daybook
    </router-link>

    <div class="d-flex">
      <button class="btn btn-outline-info mx-2">
        <i class="fa fa-sign-out-alt"></i>
      </button>
    </div>
  </nav>
</template>
