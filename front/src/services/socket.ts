import {BASE_URL} from "@/config";
import {io, Socket} from "socket.io-client";
import {ref} from "vue";
import {RoomDto, UserDto} from "../../@types/dto";
import {useAuthStore} from "@/store/auth";
import {useGameStore} from "@/store/game";
import {BoardCard} from "../../@types/dto/Room";
import {cards} from "@/store/cards/cards-content";
import {HistoryAction} from "../../@types/dto/HistoryAction";
import {END_GAME_ROUTE, GAME_ROUTE_NAME, router} from "@/router";
import { useToast } from "vue-toastification";


export const socket: Socket = io(BASE_URL);

const isConnected = ref(false);
const authStore = useAuthStore();
const gameStore = useGameStore();
const toast = useToast();

socket.on("connect", () => {
    console.log("Connected to socket");
    isConnected.value = true;
});
socket.on("disconnect", () => {
    console.log("Disconnected from socket");
    isConnected.value = false;
})

socket.on('updateRoom', (payload : RoomDto) => {
    console.log(payload);
    if(!gameStore.room) {
        throw new Error('Room not found');
    }
    gameStore.room.players = payload.players;
});


socket.on('pushActions', (payload) => {
    console.log('pushActions', payload)
    gameStore.canDraw = true;
});
socket.on('showBoard', (boardArray : BoardCard[]) => {
    console.log('showboard', boardArray)
    const otherPlayerCard = boardArray.find(card => card.playerId !== authStore.user?.id);
    console.log({otherPlayerCard})
    if (!otherPlayerCard) throw new Error('No other player card found');
    const localCard = cards.find(card => card.key === otherPlayerCard.card.key);
    if (!localCard) throw new Error('No local card found');
    console.log({localCard})
    gameStore.board.opponentCard = localCard;
    gameStore.canPlay = false
    gameStore.canDraw = true
    setTimeout(() => {
        gameStore.canPlay = true
    }, 1000)
});
socket.on("pushActions", (payload : HistoryAction[]) => {
    gameStore.history.push(...payload)
})


socket.on("roomJoined", (payload : {duel : RoomDto, user: UserDto}) => {
    gameStore.roomId = payload.duel.roomId
    authStore.user = payload.user
    gameStore.room = payload.duel
    toast.success("You joined the room")
    gameStore.launchGame()
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

socket.on("endDuel", (payload: UserDto) => {
    console.log("endDuel", payload)
    gameStore.winner = payload
    gameStore.room = null
    router.push({name: END_GAME_ROUTE})
})
socket.on('showBoard', (error: string) => {
    console.log("showBoard", error)
})
socket.on('inGameError', (error: string) => {
    console.log("error", error)
    toast.error(error)
})