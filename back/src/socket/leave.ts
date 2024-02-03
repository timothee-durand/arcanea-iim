import { findRoom } from "./singletons"
import {Server, Socket} from "socket.io";
import {ArcaneaSocket} from "../services/socket";

export async function leaveRoom({socket, roomId, userId} : {socket: Socket, roomId: string, userId: string}) {
    try {
        const room = findRoom(roomId)
        if (room) {
            const removedPlayer = room.removePlayer(userId)
            ArcaneaSocket.getClient().in(room.roomId).emit('userLeave', removedPlayer.name)
            ArcaneaSocket.getClient().in(room.roomId).emit('updateRoom',room.toObject)
        }
    } catch (e) {
        console.log(e)
        socket.emit("error", e)
    }
}
