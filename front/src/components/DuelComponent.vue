<script setup lang="ts">
import {computed} from 'vue';
import {UserDto} from "../../@types/dto";
import {useGameStore} from "@/store/game";
import {useAuthStore} from "@/store/auth";

const gameStore = useGameStore()
const authStore = useAuthStore()

const player1 = computed<UserDto>(() => {
  if(!gameStore.room || !authStore.user)
    throw new Error('No room or user');
  if (gameStore.room.players[0].id === authStore.user.id) {
    return gameStore.room.players[0];
  } else {
    return gameStore.room.players[1];
  }
});
const player2 = computed<UserDto | null>(() => {
  if(!gameStore.room || !authStore.user) return null;
  return gameStore.room.players.find((player) => player.id !== authStore.user!.id) ?? null
});

const roomId = computed(() => {
  return gameStore.roomId
})

const board = computed(() => {
  return gameStore.board
})

</script>
<template>
    <div class="roomName">
      <b>{{ roomId }}</b>
    </div>

    <div class="duel-container">
        <div class="duel-player">
            <p class="duel-player__name">{{ player1.name }}</p>
            <div class="duel-player-healthBar">
                <progress class="progressplayer" :value="player1.health" max="100"></progress>
                <span class="duel-player__life">{{ player1.health }}/100 HP</span>
            </div>
            <div class="duel-player__playedCard">
                <img v-if="board.userCard" class="hand-box__card" :src="board.userCard.image">
                <video class="fx-effect" v-if="board.userCard && board.opponentCard" autoplay width="500">
                    <source :src="'/fx/' + board.userCard.key + '_FX.webm'" type="video/webm">
                </video>
            </div>
        </div>
        <div class="duel-player">
            <div class="duel-player__playedCard">
                <img v-if="board.opponentCard" class="hand-box__card" :src="board.opponentCard.image">
                <video class="fx-effect" v-if="board.userCard && board.opponentCard" autoplay width="500">
                    <source :src="'/fx/' + board.opponentCard.key + '_FX.webm'" type="video/webm">
                </video>
            </div>
            <p v-if="player2" class="duel-player__name">{{ player2.name }}</p>
            <b v-if="!player2" style="color: red" class="duel-player__name">En attente d'un autre joueur</b>
            <div v-if="player2" class="duel-player-healthBar">
                <progress class="progressplayer" :value="player2.health" max="100"></progress>
                <span class="duel-player__life">{{ player2.health }}/100 HP</span>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .fx-effect {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 998;
    }
    .roomName {
        color: white;
        font-size: 2rem;
        font-weight: 700;
        text-align: center;
        margin: 0;
        padding: 0;
        z-index: 10;
        position: absolute;
        top: 20px;
        left: 20px;
      display: grid;
      .turn {
        font-size: 0.8rem;
      }
    }
    .duel-container {
        color: white;
        width: 100%;
        height: 70vh;
        box-sizing: border-box;
        background-size: cover;
        background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(@/assets/img/plate.png)
    }
    .duel {
        &-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 70vh;
            gap: 70px;
            padding: 50px 0;
        }
        &-player {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            &-healthBar {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                border-radius: 10px;
                margin: 10px 0;
            }
            &__name {
                font-size: 1rem;
                font-weight: bold;
                margin: 0;
            }
            &__life {
                font-size: 1rem;
                font-weight: bold;
                margin: auto;
            }
            &__playedCard {
                width: 300px;
                height: calc(300px * 1.4);
                background-color: transparent;
                border-radius: 10px;
                margin: 10px 0;
                border: 2px solid white;
                position: relative;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
        progress[value] {
            /* Reset the default appearance */
            -webkit-appearance: none;
            appearance: none;
        }
        .progressplayer {
            width: 65%;
            height: 20px;
            margin: 10px 0;
            border: 2px solid white;
        }
        .progressplayer[value]::-webkit-progress-bar {
            background-color: transparent;
            border: 2px solid white;
            width: 100%;
        }
        .progressplayer[value]::-webkit-progress-value {
            background-color: white;
        }
        progress[value] {
            /* Reset the default appearance */
            -webkit-appearance: none;
            appearance: none;
        }
    }
</style>
