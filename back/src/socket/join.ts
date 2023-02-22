import {Duel} from "../core/duel";
import {findRoom, rooms, wizardsRoom} from "./singletons";
import {Server, Socket} from "socket.io";
import {cards} from "../cards";
import {Wizard} from "../core/wizard";
import { postLogin } from "../services/iimApi";

export async function joinRoom (io: Server, socket: Socket, idRooms: string, userName: string, password: string) {
    const room = findRoom(idRooms)
    const data = {
        userName,
        password
    }

    try {
        const response =  await postLogin(data);
        const userIim = {
            "iimId": response.user.id,
            "iimToken": response.token
        }
        socket.emit("login work")    
    if (!room) {
            const { newRoom, newPlayer } = createRoom(idRooms, userName, userIim)
            wizardsRoom[newPlayer.id] = idRooms
            socket.join(idRooms)
            emitRoomJoined(io, newRoom, newPlayer)
        } else {
            try {
                const newPlayer = room.addPlayer(userName, userIim)
                wizardsRoom[newPlayer.id] = idRooms
                socket.join(idRooms)
                emitRoomJoined(io, room, newPlayer)
            } catch (e) {
                console.log(e)
                socket.emit('roomFull')
            }
        }
    } catch(e) {
        socket.emit("errorLogin", e);
    }
 

}

function emitRoomJoined(io: Server, room: Duel, user: Wizard) {
    console.log(`${user.id} (${user.name}) joined ${room.roomId}`)
    io.in(room.roomId).emit("userJoined", {duel : room.toObject, user: user.toObject()})
}

function createRoom(roomId:string, username:string, userIim) : { newRoom: Duel, newPlayer: Wizard } {
    const newRoom = new Duel(roomId, cards)
    const newPlayer = newRoom.addPlayer(username, userIim)
    rooms.push(newRoom)
    console.log(`${newPlayer.id} (${newPlayer.name}) created ${newRoom.roomId}`)
    return {newPlayer, newRoom}
}

