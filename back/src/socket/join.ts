import {Duel} from "../core/duel";
import {findRoom, rooms, wizardsRoom} from "./singletons";
import {Server, Socket} from "socket.io";
import {cards} from "../cards";
import {Wizard} from "../core/wizard";

export function joinRoom (io: Server, socket: Socket, idRooms: string, userName: string) {
    const room = findRoom(idRooms)
    if (!room) {
        const {newRoom, newPlayer} = createRoom(idRooms, userName)
        wizardsRoom[newPlayer.id] = idRooms
        socket.join(idRooms)
        emitRoomJoined(io, socket, newRoom, newPlayer)
    } else {
        try {
            const newPlayer = room.addPlayer(userName)
            wizardsRoom[newPlayer.id] = idRooms
            socket.join(idRooms)
            emitRoomJoined(io, socket, room, newPlayer)
        } catch (e) {
            console.log(e)
            socket.emit('roomFull')
        }
    }
}

function emitRoomJoined(io: Server, socket: Socket, room: Duel, user: Wizard) {
    console.log(`${user.id} (${user.name}) joined ${room.roomId}`)
    socket.emit("roomJoined", {duel : room.toObject, user: user.toObject()})

    io.in(room.roomId).emit("updateRoom", room.toObject)
    io.in(room.roomId).emit("userJoined", user.toObject())

}

function createRoom(roomId:string, username:string) : { newRoom: Duel, newPlayer: Wizard } {
    const newRoom = new Duel(roomId, cards)
    const newPlayer = newRoom.addPlayer(username)
    rooms.push(newRoom)
    console.log(`${newPlayer.id} (${newPlayer.name}) created ${newRoom.roomId}`)
    return {newPlayer, newRoom}
}
