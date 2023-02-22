<script setup lang="ts">
import { ref } from 'vue'
import {Wizard} from "@/core/wizard";

let player1: Wizard = new Wizard("Player 1");
let player2: Wizard = new Wizard("Player 2");
player2.health = 50;
</script>

<template>
  <div class="duel-container">
    <div class="duel-player">
      <p class="duel-player__name">{{player1.name}}</p>
      <div class="duel-player-healthBar">
        <progress class="progressplayer" :value="player1.health" max="100"></progress><span class="duel-player__life">{{player1.health}}/100 HP</span>
      </div>
      <span class="duel-player__playedCard"></span>
    </div>
    <div class="duel-player">
      <span class="duel-player__playedCard"></span>
      <p class="duel-player__name">{{player2.name}}</p>
      <div class="duel-player-healthBar">
        <progress class="progressplayer" :value="player2.health" max="100"></progress><span class="duel-player__life">{{player2.health}}/100 HP</span>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.duel-container {
  color: white;
  width: 100%;
  height: 70vh;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(@/assets/img/plate.png)
}

.duel {
  &-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70vh;
    gap: 70px;
    padding: 50px 0;
  }
  &-player{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &-healthBar{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      margin: 10px 0;
    }
    &__name{
      font-size: 1rem;
      font-weight: bold;
      margin: 0;
    }
    &__life{
      font-size: 1rem;
      font-weight: bold;
      margin: auto;
    }
    &__playedCard{
      width: 300px;
      height: calc(300px * 1.4);
      background-color: transparent;
      border-radius: 10px;
      margin: 10px 0;
      border: 2px solid white;
    }
  }
}

progress[value] {
  /* Reset the default appearance */
  -webkit-appearance: none;
  appearance: none;
}
.progressplayer{
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

</style>
