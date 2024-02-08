<template>
  <div class="app-duel">
      <div class="app-top">
        <DuelComponent :card="myCard" :other-card="otherCard"/>
        <HistoricDuelComponent/>
      </div>
    <keep-alive>
      <HandComponent @play-card="playCard" @show-other-card="(c) => otherCard = c"/>
    </keep-alive>
    <div class="no-other-player" v-if="!store.room || !store.room.players[1]">
      <div class="modal">
        <p>En attente d'un autre joueur...</p>
        <div>
          <p>Pour inviter un ami utilisez ce lien :</p>
          <a :href="shareLinkUrl" target="_blank">{{shareLinkUrl}}</a>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import DuelComponent from "@/components/DuelComponent.vue";
import HistoricDuelComponent from "@/components/HistoricDuelComponent.vue";
import HandComponent from "@/components/HandComponent.vue";
import {inject, ref, computed} from "vue";
import {useAuthStore} from "@/store/auth";
import {useRouter} from "vue-router";
import {END_GAME_ROUTE} from "@/router";
import {useToast} from "vue-toastification";
import {socket} from "@/services/socket";
import {UserDto} from "../../@types/dto";

const myCard = ref<Object | null>(null);
const otherCard = ref(null);

function playCard(playedCard: Object) {
    myCard.value = playedCard;
}


const store = useAuthStore();
const toast = useToast();
const router = useRouter()
socket.on("endDuel", (payload: UserDto) => {
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

const shareLinkUrl = computed(() => {
  return window.location.origin + "?room=" + store.roomId
})
</script>

<style scoped lang="scss">
.app-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.app-duel {
  background: linear-gradient(rgba(0,0,0,1), rgba(0,0,0,1),rgba(19,35,59,1));
}

.no-other-player {
  position: absolute;
  top:0;
  left:0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
  width: 100vw;
  background: rgba(0,0,0,0.5);

  > .modal {
    background: #fff;
    color: #000;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    display: grid;
    gap: 10px;
  }
}
</style>
