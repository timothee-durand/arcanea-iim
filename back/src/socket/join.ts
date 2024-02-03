import {Duel} from "../core/duel";
import {findRoom, rooms, wizardsRoom} from "./singletons";
import {Server, Socket} from "socket.io";
import {cards} from "../cards";
import {UserIim, Wizard} from "../core/wizard";
import {postLogin} from "../services/iimApi";
import {postStart} from "../services/iimApi";
import {RedisClientType} from "redis";
import {ArcaneaSocket} from "../services/socket";

export async function joinRoom({socket, idRooms, userName}:{socket: Socket, idRooms: string, userName: string}) {
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
            emitRoomJoined(socket, newRoom, newPlayer)
        } else {
            try {
                const newPlayer = room.addPlayer(userName, userIim)
                wizardsRoom[newPlayer.id] = idRooms
                // const resultStartIim = await postStart("Arcanea", room.userPlayerIimId, "1v1", response.token)
                // console.log("game started on iim", resultStartIim)
                room.iimGameId = 0
                // console.log(room.iimGameId)
                socket.join(idRooms)
                emitRoomJoined(socket, room, newPlayer)
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

function emitRoomJoined(socket: Socket, room: Duel, user: Wizard) {
    console.log(`${user.id} (${user.name}) joined ${room.roomId}`)
    socket.emit("roomJoined", {duel: room.toObject, user: user.toObject()})

    ArcaneaSocket.getClient().in(room.roomId).emit("updateRoom", room.toObject)
    ArcaneaSocket.getClient().in(room.roomId).emit("userJoined", user.toObject())

}

function createRoom(roomId: string, username: string, userIim: UserIim): { newRoom: Duel, newPlayer: Wizard } {
    const newRoom = new Duel(roomId, cards)
    const newPlayer = newRoom.addPlayer(username, userIim)
    rooms.push(newRoom)
    console.log(`${newPlayer.id} (${newPlayer.name}) created ${newRoom.roomId}`)
    return {newPlayer, newRoom}
}

