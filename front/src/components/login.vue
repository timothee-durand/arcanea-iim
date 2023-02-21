<script setup lang="ts">
import type { Socket } from "socket.io-client";
import { inject, ref } from "vue";

const idRoom = ref<String>("");
const userName = ref<String>("");
const isLogged = ref<Boolean>(false);

const socket: Socket = inject("socket") as Socket;

socket.on("joinRoom", (rooms: String, user: String) => {
    console.log("join", rooms, user)
})

const joinRoom = () => {
    if(0 !== userName.value.length) {
        socket.emit("joinRoom", idRoom.value, userName.value)
        isLogged.value = true;
    }
}

</script>
<template>
    <div class="limiter">
        <div class="container-login">
            <div class="wrap-login100 p-t-50 p-b-90">
                <form class="login100-form" @submit.prevent="joinRoom">
                    <span class="login100-form-title p-b-51">CONNECT TO ROOM</span>
                    <div class="validate-input m-b-16">
                        <p v-if="isLogged">tu es connecté</p>
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