<template>
  <div class="container">
    <div class="formContainer">
      <div class="formConnexion">
        <h1>Game Over</h1>
        <span>The winner is {{store.winner.name}}</span>
        <router-link :to="{name: LOGIN_ROUTE_NAME}">Go back to the login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {LOGIN_ROUTE_NAME} from "@/router";
import {useAuthStore} from "@/store/auth";

const store = useAuthStore();
</script>

<style scoped lang="scss"></style>
