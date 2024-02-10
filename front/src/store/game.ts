import { defineStore } from "pinia";
import {Card} from "@/store/cards";
import {computed, ref } from "vue";
import {RoomDto, UserDto} from "../../@types/dto";
import {HistoryAction} from "../../@types/dto/HistoryAction";
import {cards} from "@/store/cards/cards-content";
import {useAuthStore} from "@/store/auth";
import {randomize} from "@/utils/randomize";


interface Board {
    userCard: Card | null;
    opponentCard: Card | null;
}

export const useGameStore = defineStore('game', () => {
    const draft = ref<Card[]>([]);
    const havePlayed = ref(false);
    const deck = ref<Card[]>([]);
    const hand = ref<Card[]>([]);
    const history = ref<HistoryAction[]>([]);
    const board = ref<Board>({userCard: null, opponentCard: null});

    const room = ref<RoomDto | null>(null)
    const has2Players = computed(() => room.value?.players.length === 2);
    const canDraw = ref(false);
    const canPlay = ref(true);
    const winner = ref<UserDto | null>(null);
    const roomId = ref<string | null>(null);


    function initDeck(userCards: string[]) {
        deck.value = userCards.map((cardName) => {
            const card = cards.find(element => element.key === cardName);
            if (!card) console.log('card not found', cardName);
            return card;
        }).filter(card => card !== undefined) as Card[];
        canDraw.value = true;
    }

    function drawCard(count : number) {
        console.log(canDraw.value, deck.value.length, count)
        if(!canDraw.value) {
            console.error('Cannot draw card')
            return;
        }
        if (canDraw.value && deck.value.length >= count) {
            console.log('draw card')
            for (let i = 0; i < count; i++) {
                hand.value.push(deck.value.pop() as Card);
            }
            canDraw.value = false;
        }
        if (deck.value.length === 0) {
            deck.value.push(...randomize(draft.value));
            draft.value = [];
        }
        //emit event to update hand and deck with socket.io
    }

    const authStore = useAuthStore();
    function launchGame() {
        console.log(room.value, authStore.user)
        if (room.value && authStore.user) {
            initDeck(authStore.user.cards)
            drawCard(3);
        }
    }


    return {
        draft,
        havePlayed,
        deck,
        hand,
        room,
        has2Players,
        canDraw,
        history,
        winner,
        roomId,
        drawCard,
        launchGame,
        board,
        canPlay
    }
})