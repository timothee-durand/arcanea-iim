import {BASE_URL} from "@/config";
import {io, Socket} from "socket.io-client";
import {ref} from "vue";


export const socket: Socket = io(BASE_URL);

const isConnected = ref(false);
socket.on("connect", () => {
    console.log("Connected to socket");
    isConnected.value = true;
});
socket.on("disconnect", () => {
    console.log("Disconnected from socket");
    isConnected.value = false;
})

