<script setup lang="ts">
import type {Socket} from "socket.io-client";
import {inject, ref} from "vue";

import {useToast} from "vue-toastification";
import {useAuthStore} from "@/store/auth";
import {useRouter, useRoute} from "vue-router";
import {GAME_ROUTE_NAME} from "@/router";
import cardsCascades from "../assets/cardsCascades.png";
import arcaneaLogo from "../assets/arcaneaLogo.png";
import FloatCards from "../components/FloatCards.vue";
import {useCardsStore} from "@/store/cards";


const idRoom = ref<String>("");
const userName = ref<String>("");
const store = useAuthStore();
const toast = useToast();
const router = useRouter();
const route = useRoute()

if(route.query.room) {
  idRoom.value = route.query.room as string
}

const socket: Socket = inject("socket") as Socket;

socket.on("roomJoined", (payload) => {
  store.roomId = payload.duel.roomId
  store.user = payload.user
  store.room = payload.duel
  toast.success("You joined the room")
  router.push({name: GAME_ROUTE_NAME})
})

socket.on("rooms", (payload: any) => {
  console.log("rooms", payload)
})


socket.on("errorLogin", (error: string) => {
  console.log("errorLogin", error)
  toast.error(error)
})


socket.on("joinRoom", (rooms: String, user: String) => {
  console.log("join", rooms, user)
})

socket.on("roomFull", () => {
  console.log("roomFull")
  toast.error("Room is full")
})

const joinRoom = () => {
  if (0 !== userName.value.length) {
    socket.emit("joinRoom", idRoom.value, userName.value)
  }
}

</script>
<template>
  <div class="container">
    <form @submit.prevent="joinRoom" class="formContainer">
      <h1>Connexion</h1>
      <div class="spaceBetweenTerms"/>
      <span class="spaceBetweenTerms">
                <p>Connectez-vous à votre compte pour jouer</p>
            </span>
      <div class="formConnexion">
        <input
            type="text"
            class="inputCustom"
            placeholder="PSEUDO"
            required
            v-model="userName"
        />
        <input
            class="inputCustom"
            placeholder="ROOM"
            required
            v-model="idRoom"
        />
        <button type="submit" class="connexionButton">REJOINDRE OU CREER</button>
      </div>
    </form>
    <FloatCards/>
    <img src="../assets/img/deck.png" alt="deck" class="deck"/>
    <div class="logoRow">
      <img class="imgLogo" :src="arcaneaLogo"/>
    </div>
  </div>
</template>
<style scoped lang="scss">

.container {
  position: relative;
  height: 100vh;
  overflow: hidden;

  img:nth-child(3) {
    width: 400px;
    position: absolute;
    bottom: -100px;
    right: 22%
  }

  .formContainer {
    display: flex;
    position: fixed;
    left: 7%;
    bottom: 30%;
    display: inline;
    color: #fff;

    .spaceBetweenTerms {
      margin: 20px;
    }

    h1 {
      font-family: 'BluuNext-Bold';
      font-size: 34px;
    }

    span {
      font-size: 18px;
      font-family: "Poppins-ExtraLight";
    }

    .formConnexion {
      color: #fff;
      width: 290px;

      .connexionButton {
        padding: 10px 20px;
      }


      .inputCustom {
        width: 100%;
        padding: 10px 0;
        font-size: 16px;
        font-family: "Poppins-Regular";
        margin-bottom: 30px;
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
        background: transparent;
        color: #fff;
      }

      .inputCustom::-webkit-input-placeholder {
        color: #fff;
        font-family: "Poppins-ExtraLight";
      }
    }
  }

  .logoRow {
    width: 250px;
    margin: 0 auto;
  }

  .imgLogo {
    position: fixed;
    display: flex;
    width: 150px;
    top: 3%;
    text-align: center;
  }

  .imgCustom {
    top: -10%;
    left: 35%;
    position: fixed;
    width: 85%;
  }
}

.formConnexion {
  color: #fff;
  width: 290px;

  .connexionButton {
    background-color: #514a92;
    border-radius: 50px;
    color: #fff;
    height: 50px;
    width: 100%;
    border: none;
    font-size: 20px;
  }

  .inputCustom {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    font-family: "Poppins-Regular";
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
    color: #fff;
  }

  .inputCustom::-webkit-input-placeholder {
    color: #fff;
    font-family: "Poppins-ExtraLight";
  }
}

.logoRow {
  width: 250px;
  margin: 0 auto;
}

.imgLogo {
  position: fixed;
  display: flex;
  width: 150px;
  top: 3%;
  text-align: center;
}

.imgCustom {
  top: -10%;
  left: 35%;
  position: fixed;
  width: 85%;
}

</style>
