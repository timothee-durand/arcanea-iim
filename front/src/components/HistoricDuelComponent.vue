<script setup lang="ts">
import { ref } from 'vue'


let historic = {
  1: {
    player: {
        name: "Player 1",
    },
    card: {
      name: "Fireball",
      type: "Attack",
    },
    info: "Player inflict 10 damage to the enemy"
  },
  2: {
    player: {
      name: "Player 2",
    },
    card: {
      name: "Lumos",
      type: "Utility",
    },
    info: "Player heal 10 HP to the enemy"
  },

}
</script>

<template>
  <div class="historic-container">
    <img class="historic__logo" src="@/assets/img/Arcanea-logo-white.png" alt="Logo Arcanea">
    <ul class="historic-list">
      <li class="historic-item" v-for="item in historic">
        <hr size="1" >
        <p class="historic-item-player">{{item.player.name}} à lancé <span :style="[item.card.type==='Attack' ? 'color:red' : 'color:yellow']">{{item.card.name}}</span></p>
        <p class="historic-item-info">{{item.info}}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.historic {
  &-container {
    width: 35vh;
    color: white;
    height: 70vh;
    display: flex;
    flex-direction: column;
    padding: 30px;
    box-sizing: border-box;
  }
  &__logo {
    width: 75px;
    margin:  0 auto;
    object-fit: contain;
  }
  &-list {
    list-style: none;
    padding: 0;
    margin: 0;
    height: 100%;
  }

  &-item{

    box-sizing: border-box;
    &-player {
      font-weight: bold;
    }
    span {
      font-weight: bolder;
    }
    &-info {
      font-size: 0.8em;
      margin: 10px 0 0 20px;
      color: #cccccc;
      font-weight: lighter;
      font-style: italic;
    }
  }

}

hr {
  border-color: #cccccc;
  margin: 20px 0;
}


</style>
