import {deleteRoom, findRoom} from "./singletons";
import {Server, Socket} from "socket.io";
import { postEndGame } from "../services/iimApi";
import {ArcaneaSocket} from "../services/socket";

export async function playCard({socket, roomId, cardName, userId}:{socket: Socket, roomId: string, userId: string, cardName: string}) {
    try {
        const room = findRoom(roomId)
        if (room) {
            room.addCardToBoard(cardName, userId)
            const boardObject = [...room.boardObject]
            const turnResult = await room.tryPlayTurn()
            if(turnResult !== false) {
                ArcaneaSocket.getClient().in(room.roomId).emit('showBoard', boardObject)
                ArcaneaSocket.getClient().in(room.roomId).emit('pushActions', turnResult)

                for (const player of room.players) {
                    if(player.health <= 0) {
                        let winner = room.players.sort((a, b) => b.health - a.health)[0]
                        ArcaneaSocket.getClient().in(room.roomId).emit('endDuel', winner.toObject())
                        // console.log(`${winner.name} coucou won the duel!`)
                        // const resultEndGame = await postEndGame(room.iimGameId, room.userPlayerIimId, winner.userIim.iimId, winner.userIim.iimToken)
                        // console.log(resultEndGame)
                        deleteRoom(room.roomId)
                    }
                }
            }
            ArcaneaSocket.getClient().in(room.roomId).emit('updateRoom', room.toObject)
        }
    } catch (e) {
        console.log(e)
        socket.emit("inGameError", e.message)
    }
}
