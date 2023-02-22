<template>
  <div class="center-container">
    <div class="container">
      <h1>Game Over</h1>
      <span>The winner is {{ store.winner.name }}</span>
      <router-link :to="{name: LOGIN_ROUTE_NAME}">Go back to the login</router-link>
    </div>
  </div>

</template>

<script setup lang="ts">
import {LOGIN_ROUTE_NAME} from "@/router";
import {useAuthStore} from "@/store/auth";

const store = useAuthStore();

</script>

<style scoped lang="scss">
.center-container {
  display:grid;
  min-height: 100vh;
  place-items: center;

  .container {
    display: grid;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    gap: 10px;

    a {
      text-decoration: none;
      color: #000;
      font-weight: bold;
      font-family: var(--font-title);
    }
  }
}
</style>
