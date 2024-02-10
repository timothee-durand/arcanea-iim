<template>
  <div class="app-duel">
      <div class="app-top">
        <DuelComponent />
        <HistoricDuelComponent/>
      </div>
    <keep-alive>
      <HandComponent @play-card="playCard" @show-other-card="(c) => otherCard = c"/>
    </keep-alive>
    <div class="no-other-player" v-if="!gameStore.room || !gameStore.room.players[1]">
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
import { ref, computed} from "vue";
import {useRouter} from "vue-router";
import {useGameStore} from "@/store/game";

const myCard = ref<Object | null>(null);
const otherCard = ref(null);

function playCard(playedCard: Object) {
    myCard.value = playedCard;
}


const gameStore = useGameStore();
const router = useRouter()


const shareLinkUrl = computed(() => {
  return window.location.origin + "?room=" + gameStore.roomId
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
