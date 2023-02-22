import { findRoom } from "./singletons"
import {Server, Socket} from "socket.io";

export async function leaveRoom(io: Server, socket: Socket, roomId: string, userId: string) {
    try {
        const room = findRoom(roomId)
        if (room) {
            const removedPlayer = room.removePlayer(userId)
            io.in(room.roomId).emit('userLeave', removedPlayer.name)
            io.in(room.roomId).emit('updateRoom',room.toObject)
        }
    } catch (e) {
        console.log(e)
        socket.emit("error", e)
    }
}
