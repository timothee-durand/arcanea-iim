<script setup lang="ts">
import type {Socket} from "socket.io-client";
import {inject, ref, computed, onBeforeUnmount} from "vue";
import {useAuthStore} from "@/store/auth";
import { useToast } from "vue-toastification";

const idRoom = ref<String>("");
const userName = ref<String>("");

const toast = useToast()

const store = useAuthStore();

const socket: Socket = inject("socket") as Socket;

socket.on("userJoined", (payload) => {
  console.log(payload, payload.duel.roomId, payload.userId, payload.duel)
  store.roomId = payload.duel.roomId
  store.user = payload.user
  store.room = payload.duel
  toast.success("You joined the room")
})

const joinRoom = () => {
  if (0 !== userName.value.length) {
    socket.emit("joinRoom", idRoom.value, userName.value)
  }
}

socket.on("roomFull", () => {
  console.log("roomFull")
  toast.error("Room is full")
})

socket.on("pushActions", (payload) => {
  console.log("pushActions", payload)
})

socket.on("showBoard", (payload) => {
  console.log("showBoard", payload)
})

socket.on("updateRoom", (payload) => {
  console.log("updateRoom", payload)
})

function playCard(card: string) {
  console.log("playCard", card)
  socket.emit("playCard", store.roomId, store.user?.id, card)
}

onBeforeUnmount(() => {
  socket.emit('leaveRoom', store.roomId, store.user?.id)
  socket.off("userJoined")
  socket.off("roomFull")
  socket.off("pushActions")
  socket.off("showBoard")
  socket.off("updateRoom")
})

const cards = computed(() => {
  return store.user?.cards ?? []
})
</script>
<template>
  <div class="limiter">
    <div class="container-login">
      <div class="wrap-login100 p-t-50 p-b-90">
        <form class="login100-form" @submit.prevent="joinRoom">
          <span class="login100-form-title p-b-51">CONNECT TO ROOM</span>
          <div class="validate-input m-b-16">
            <label>Room</label>
            <input
                type="text"
                placeholder="text"
                class="input-100"
                v-model="idRoom"
            />
            <label>User</label>
            <input
                type="text"
                placeholder="text"
                class="input-100"
                v-model="userName"
            />
            <button
                class="custom-button"
                type="submit"
            >
              Create Room
            </button>
          </div>
        </form>

        <button v-for="card in cards" type="button" :key="card" @click="playCard(card)">play {{ card }}</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.custom-button {
  border-radius: 10px;
  color: #fff;
  background-color: #403866;
}

.input-100 {
  font-family: Ubuntu-Bold;
  color: #403866;
  line-height: 1.2;
  font-size: 18px;
  display: block;
  width: 100%;
  background: 0 0;
  height: 62px;
  padding: 0 20px 0 38px;
}

.m-b-16 {
  margin-bottom: 16px;
}

.validate-input {
  position: relative;
}

.p-b-51 {
  padding-bottom: 51px;
}

.login100-form-title {
  font-family: Ubuntu-Bold;
  font-size: 30px;
  color: #403866;
  line-height: 1.2;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
  display: block;
}

.login100-form {
  width: 100%;
}

.p-b-90 {
  padding-bottom: 90px;
}

.p-t-50 {
  padding-top: 50px;
}

.wrap-login100 {
  width: 600px;
  background: #fff;
  border-radius: 10px;
  position: relative;
}

.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-login {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
