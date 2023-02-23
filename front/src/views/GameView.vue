<template>
  <div class="app-duel">
      <div class="app-top">
        <DuelComponent :card="myCard" :other-card="otherCard"/>
        <HistoricDuelComponent/>
      </div>
    <keep-alive>
      <HandComponent @play-card="(c) => myCard = c" @show-other-card="(c) => otherCard = c"/>
    </keep-alive>
  </div>
</template>

<script setup lang="ts">
import DuelComponent from "@/components/DuelComponent.vue";
import HistoricDuelComponent from "@/components/HistoricDuelComponent.vue";
import HandComponent from "@/components/HandComponent.vue";
import {inject, ref} from "vue";
import {Socket} from "socket.io-client";
import {Wizard} from "@/core/wizard";
import {useAuthStore} from "@/store/auth";
import {useRouter} from "vue-router";
import {END_GAME_ROUTE} from "@/router";
import {useToast} from "vue-toastification";

const card = ref<Object>(null);
const draft = ref<Array<Object>>([])

function playCard(playedCard: Object) {
    if (card.value !== null) {
        draft.value.push(card.value);
    }
    card.value = playedCard;
}


const socket: typeof Socket = inject("socket") as typeof Socket;
const store = useAuthStore();
const toast = useToast();
const router = useRouter()
socket.on("endDuel", (payload: Wizard) => {
  console.log("endDuel", payload)
  store.winner = payload
  store.room = null
  router.push({name: END_GAME_ROUTE})
})
socket.on('showBoard', (error: string) => {
  console.log("showBoard", error)
})
socket.on('inGameError', (error: string) => {
  console.log("error", error)
  toast.error(error)
})

const myCard = ref(null)
const otherCard = ref(null)
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
