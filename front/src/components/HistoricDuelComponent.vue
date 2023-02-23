<script>
import {inject, ref} from 'vue'
import {Socket} from "socket.io-client";
import {DECK_ROUTE_NAME} from "@/router/routes";

export default {
  name: "HistoricDuelComponent",
  data() {
    return {
      historic: [],
      socket: inject("socket"),
      deckRoute: DECK_ROUTE_NAME

    };
  },
  mounted() {

    this.socket.on("pushActions", (payload) => {
      this.updateHistoric(payload);
    })

  },

  methods: {
    updateHistoric(payload) {
      payload.map((item, index) => {
        this.historic.push(item);
      })
      let container = document.querySelector(".historic-container");
      container.scrollTop = container.scrollHeight;
    }
  },
}





</script>

<template>
  <div class="historic-container">
    <img class="historic__logo" src="@/assets/img/Arcanea-logo-white.png" alt="Logo Arcanea">
    <router-link :to="{name:deckRoute}" class="connexionButton">Deck</router-link>
    <ul class="historic-list">
      <li class="historic-item" v-for="item in historic">
        <hr size="1" >
        <p class="historic-item-player">{{item.player.name}} à lancé
          <span :style="[item.card.type==='Attack' ? 'color:red' :
                         item.card.type==='Utility' ? 'color:yellow' :
                         item.card.type==='Unforgivable' ? 'color:green' :
                         item.card.type==='Defense' ? 'color: blue' : 'color:white']">
            {{item.card.name}}</span></p>
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
    overflow-y: scroll;
    &::-webkit-scrollbar-thumb {
      width: 15px;
      background-image: linear-gradient(180deg, #e8bf58 0%, #d99922 99%);
      box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
      border-radius: 100px;

    }
    &::-webkit-scrollbar-track {
      background-color: #070707;
      border-radius: 100px;
    }
    &::-webkit-scrollbar {
      width: 20px;
    }
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
