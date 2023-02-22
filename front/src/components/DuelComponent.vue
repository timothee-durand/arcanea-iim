<script setup lang="ts">
    import {computed, ref} from 'vue';
    import {Wizard} from '@/core/wizard';
    import {useAuthStore} from '@/store/auth';

    const store = useAuthStore();

    const props = defineProps(['card']);

    let player1 = computed(() => {
        if (store.room?.players[0].id === store.user?.id) {
            return store.room?.players[0] as Wizard;
        } else {
            return store.room?.players[1] as Wizard;
        }
    });
    let player2 = computed(() => {
        return store.room.players.find(player => player.id !== store.user?.id) as Wizard;
    });
</script>
<template>
    <b class="roomName">{{ store.roomId }}</b>
    <div class="duel-container">
        <div class="duel-player">
            <p class="duel-player__name">{{ player1.name }}</p>
            <div class="duel-player-healthBar">
                <progress class="progressplayer" :value="player1.health" max="100"></progress>
                <span class="duel-player__life">{{ player1.health }}/100 HP</span>
            </div>
            <div class="duel-player__playedCard">
                <img v-if="props.card" class="hand-box__card" :src="props.card.image">
            </div>
        </div>
        <div class="duel-player">
            <div class="duel-player__playedCard"></div>
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
