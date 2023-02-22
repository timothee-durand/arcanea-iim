<script setup lang="ts">
import Deck from './components/Deck.vue';
/* import {getCards, getDeck, getDecks} from "@/services/arcaneaApi"; */

/* // API USE EXAMPLE
console.log(await getCards())
console.log(await getDeck(1))
console.log(await getDecks()) */
</script>

<template>
  <Deck />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
