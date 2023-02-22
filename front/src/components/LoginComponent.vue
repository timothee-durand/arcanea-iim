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
    <div class="container">
        <div class="card">
            <div class="card-image"></div>
            <form class="card-form" @submit.prevent="joinRoom">
                <h2>Prépares-toi au combat</h2>
                <small v-if="isLogged">Cet utilisateur est déjà connecté.</small>
                <div class="input">
                    <input type="text" class="input-field" v-model="userName" required/>
                    <label class="input-label">Utilisateur</label>
                </div>
                <div class="input">
                    <input type="text" class="input-field" v-model="idRoom" required/>
                    <label class="input-label">Room</label>
                </div>
                <div class="action">
                    <button class="action-button">Jouer</button>
                </div>
            </form>
            <div class="card-info">
                <p>Si tu rencontres des difficultés pour te connecter, consulte <a href="https://www.youtube.com/watch?v=BBJa32lCaaY&ab_channel=LegacyPNDA">ce lien ci-dessous.</a></p>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    img {
        max-width: 100%;
        display: block;
    }
    input {
        appearance: none;
        border-radius: 0;
    }
    h2 {
        margin-bottom: 1rem;
    }
    .card {
        margin: 2rem auto;
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 425px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 10px 20px 0 rgba(#999, .25);
        padding: .75rem;
    }
    .card-image {
        border-radius: 8px;
        overflow: hidden;
        padding-bottom: 65%;
        background: url('../assets/img/Arcanea-logo-white.png');
        background-repeat: no-repeat;
        background-color: rgba(19, 35, 59, 1);
        background-size: 25%;
        background-position: 50% 50%;
        position: relative;
    }
    .card-heading {
        position: absolute;
        left: 5%;
        top: 10%;
        right: 10%;
        font-size: 1.75rem;
        font-weight: 700;
        color: #735400;
        line-height: 1.222;
        small {
            display: block;
            font-size: .75em;
            font-weight: 400;
            margin-top: .25em;
        }
    }
    .card-form {
        padding: 2rem 1rem 0;
    }
    .input {
        display: flex;
        flex-direction: column-reverse;
        position: relative;
        padding-top: 1.5rem;
        & + .input {
            margin-top: 1.5rem;
        }
    }
    .input-label {
        color: #8597a3;
        position: absolute;
        top: 1.5rem;
        transition: .25s ease;
    }
    .input-field {
        border: 0;
        z-index: 1;
        background-color: transparent;
        border-bottom: 2px solid #eeeeee;
        font: inherit;
        font-size: 1.125rem;
        padding: .25rem 0;
        &:focus, &:valid {
            outline: 0;
            border-bottom-color: #13233BFF;
            & + .input-label {
                color: #13233BFF;
                transform: translateY(-1.5rem);
            }
        }
    }
    .action {
        margin-top: 2rem;
    }
    .action-button {
        font: inherit;
        font-size: 1.25rem;
        padding: 1em;
        width: 100%;
        font-weight: 500;
        background-color: #13233BFF;
        border-radius: 6px;
        color: #ffffff;
        border: 0;
        &:focus {
            outline: 0;
        }
    }
    .card-info {
        padding: 1rem 1rem;
        text-align: center;
        font-size: .875rem;
        color: #8597a3;
        a {
            display: block;
            color: #13233BFF;
            text-decoration: none;
        }
    }
</style>
