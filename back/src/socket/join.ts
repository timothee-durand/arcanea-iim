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
        emitRoomJoined(io, newRoom, newPlayer)
    } else {
        try {
            const newPlayer = room.addPlayer(userName)
            wizardsRoom[newPlayer.id] = idRooms
            socket.join(idRooms)
            emitRoomJoined(io, room, newPlayer)
        } catch (e) {
            console.log(e)
            socket.emit('roomFull')
        }
    }
}

function emitRoomJoined(io: Server, room: Duel, user: Wizard) {
    console.log(`${user.id} (${user.name}) joined ${room.roomId}`)
    io.in(room.roomId).emit("userJoined", {duel : room.toObject, user: user.toObject()})
}

function createRoom(roomId:string, username:string) : { newRoom: Duel, newPlayer: Wizard } {
    const newRoom = new Duel(roomId, cards)
    const newPlayer = newRoom.addPlayer(username)
    rooms.push(newRoom)
    console.log(`${newPlayer.id} (${newPlayer.name}) created ${newRoom.roomId}`)
    return {newPlayer, newRoom}
}
