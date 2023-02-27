<script>
import {inject, ref} from 'vue'
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
    async updateHistoric(payload) {
      const container = this.$refs.container;

      for (const payloadElement of payload) {
        this.historic.push(payloadElement);
        await wait(100);
        if(container) {
          container.scrollTop = container.scrollHeight;
        }
        await wait(500);
      }
      if(container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  },
}


async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

</script>

<template>
  <div class="historic-container" ref="container">
    <img class="historic__logo" src="@/assets/img/Arcanea-logo-white.png" alt="Logo Arcanea">
    <router-link :to="{name:deckRoute}" class="connexionButton">Deck</router-link>
    <transition-group name="list" tag="ul" class="historic-list">
      <li class="historic-item" v-for="(item,i ) in historic" :key="i">
        <hr size="1">
        <p class="historic-item-player">{{ item.player.name }} à lancé
          <span class="historic-item-type" :style="[item.card.type==='Attack' ? 'color:red' :
                         item.card.type==='Utility' ? 'color:yellow' :
                         item.card.type==='Unforgivable' ? 'color:green' :
                         item.card.type==='Defense' ? 'color: blue' : 'color:white']">
            {{ item.card.name }}
          </span>
        </p>
        <p class="historic-item-info">{{ item.info }}</p>
      </li>
    </transition-group>
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
    margin: 0 auto;
    object-fit: contain;
  }

  &-list {
    list-style: none;
    padding: 0;
    margin: 0;
    height: 100%;
  }

  &-item {
    font-size: 0.9rem;
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

    &-type {
      font-family: var(--font-title);
    }
  }

}

hr {
  border-color: #cccccc;
  margin: 20px 0;
}


.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>
