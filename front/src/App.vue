<script setup lang="ts">
import {useGameStore} from "@/store/game";
import {watchEffect} from "vue";
import {GAME_ROUTE_NAME} from "@/router";
import {useRouter} from "vue-router";
import {useRoute} from "vue-router";

window.addEventListener("contextmenu", e => e.preventDefault());

const gameStore = useGameStore();
const router = useRouter();
const route = useRoute()
watchEffect(() => {
  if (gameStore.room !== null && route.name !== GAME_ROUTE_NAME) {
    router.push(GAME_ROUTE_NAME)
  }
});
</script>
<template>
  <div id="app">
    <RouterView/>
  </div>
</template>
