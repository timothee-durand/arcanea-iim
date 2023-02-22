<script setup lang="ts">
import { inject, ref } from "vue";
import '../styles/connexion.css'
import Vue from 'vue';
import cardsCascades from '../assets/cardsCascades.png'
import arcaneaLogo from '../assets/arcaneaLogo.png'

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
    <div  class="container">
        <form @submit="joinRoom" class="formContainer">
            <h1>Connexion</h1>
            <div  class="spaceBetweenTerms"/>
            <span class="spaceBetweenTerms">
                <p>Connectez-vous à votre compte pour jouer</p>
            </span>
            <div class="formConnexion">
                <input class="inputCustom" placeholder="PSEUDO"/>
                <input class="inputCustom" placeholder="MOT DE PASSE"/>
                <input type="submit"  value="CONNEXION" class="connexionButton" />
            </div>
        </form>
        <img class="imgCustom" :src="cardsCascades"/>
        <div class="logoRow">
            <img class="imgLogo" :src="arcaneaLogo"/>
        </div>
    </div>
</template>
<style scoped>
    .formContainer {
        display: flex;
        position: fixed;
        left: 7%;
        bottom: 30%;
        display: inline;
        color: #fff;
    }

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
    
    .container {
        position: relative;
        max-height: 100vh;
    }
    .container::after {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgba(0,0,0,0.5718662464985995) 0%, rgba(19,35,59,1) 100%);
    }
    .logoRow {
        width : 250px;
        margin: 0 auto;
    }

    .imgLogo {
        position  : fixed;
        display   : flex;
        width     : 150px;
        top       : 3%;
        text-align: center;
    }

    .imgCustom {
        top: -10%;
        left: 35%;
        position: fixed;
        width   : 85%;
    }

    .formConnexion {
        color: #fff;
        width: 290px;
    }   

    .connexionButton {
        background-color: #514A92;
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
    }

    .inputCustom::-webkit-input-placeholder {
        color: #fff;
        font-family: "Poppins-ExtraLight";
    }
</style>