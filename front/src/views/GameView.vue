<template>
  <div class="app-duel">

    <div class="app-top">
      <DuelComponent/>
      <HistoricDuelComponent/>
    </div>
    <HandComponent/>
  </div>
</template>

<script setup lang="ts">
import DuelComponent from "@/components/DuelComponent.vue";
import HistoricDuelComponent from "@/components/HistoricDuelComponent.vue";
import HandComponent from "@/components/HandComponent.vue";
import {inject} from "vue";
import {Socket} from "socket.io-client";
import {Wizard} from "@/core/wizard";
import {useAuthStore} from "@/store/auth";
import {useRouter} from "vue-router";
import {END_GAME_ROUTE} from "@/router";

const socket: typeof Socket = inject("socket") as typeof Socket;
const store = useAuthStore();
const router = useRouter()
socket.on("endDuel", (payload: Wizard) => {
  console.log("endDuel", payload)
  store.winner = payload
  router.push({name: END_GAME_ROUTE})
})
</script>

<style scoped>
.app-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.app-duel {
  background: linear-gradient(rgba(0,0,0,1), rgba(0,0,0,1),rgba(19,35,59,1));
}
</style>
