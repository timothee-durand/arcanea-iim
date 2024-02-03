import {Duel} from "../core/duel";
import {findRoom, rooms, wizardsRoom} from "./singletons";
import {Server, Socket} from "socket.io";
import {cards} from "../cards";
import {UserIim, Wizard} from "../core/wizard";
import {postLogin} from "../services/iimApi";
import {postStart} from "../services/iimApi";
import {RedisClientType} from "redis";

export async function joinRoom(io: Server, socket: Socket, idRooms: string, userName: string, password: string, redis: RedisClientType) {
    const room = findRoom(idRooms)

    // const data = {
    //     userName,
    //     password
    // }

    try {
        // console.log("Try get user " + userName)
        // const response = await postLogin(data);
        const userIim: UserIim = {
            "iimId": "",
            "iimToken": ""
        }
        // console.log("Get user ", userIim)
        if (!room) {
            const {newRoom, newPlayer} = createRoom(idRooms, userName, userIim)
            wizardsRoom[newPlayer.id] = idRooms
            socket.join(idRooms)
            emitRoomJoined(io, socket, newRoom, newPlayer)
        } else {
            try {
                const newPlayer = room.addPlayer(userName, userIim)
                wizardsRoom[newPlayer.id] = idRooms
                // const resultStartIim = await postStart("Arcanea", room.userPlayerIimId, "1v1", response.token)
                // console.log("game started on iim", resultStartIim)
                room.iimGameId = 0
                // console.log(room.iimGameId)
                socket.join(idRooms)
                emitRoomJoined(io, socket, room, newPlayer)
            } catch (e) {
                console.log(e)
                socket.emit('roomFull')
            }

        }
        socket.emit("rooms", rooms)
    } catch (e) {
        console.log(e)
        console.log('error on iim login', e?.response?.data?.message)
        socket.emit("errorLogin", e?.response?.data?.message);
    }
}

function emitRoomJoined(io: Server, socket: Socket, room: Duel, user: Wizard) {
    console.log(`${user.id} (${user.name}) joined ${room.roomId}`)
    socket.emit("roomJoined", {duel: room.toObject, user: user.toObject()})

    io.in(room.roomId).emit("updateRoom", room.toObject)
    io.in(room.roomId).emit("userJoined", user.toObject())

}

function createRoom(roomId: string, username: string, userIim: UserIim): { newRoom: Duel, newPlayer: Wizard } {
    const newRoom = new Duel(roomId, cards)
    const newPlayer = newRoom.addPlayer(username, userIim)
    rooms.push(newRoom)
    console.log(`${newPlayer.id} (${newPlayer.name}) created ${newRoom.roomId}`)
    return {newPlayer, newRoom}
}

