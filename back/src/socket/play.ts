import {deleteRoom, findRoom} from "./singletons";
import {Server, Socket} from "socket.io";
import { postEndGame } from "../services/iimApi";

export async function playCard(io: Server, socket: Socket, roomId: string, userId: string, cardName: string) {
    try {
        const room = findRoom(roomId)
        if (room) {
            room.addCardToBoard(cardName, userId)
            const boardObject = [...room.boardObject]
            const turnResult = await room.tryPlayTurn()
            if(turnResult !== false) {
                io.in(room.roomId).emit('showBoard', boardObject)
                io.in(room.roomId).emit('pushActions', turnResult)

                for (const player of room.players) {
                    if(player.health <= 0) {
                        let winner = room.players.sort((a, b) => b.health - a.health)[0]
                        io.in(room.roomId).emit('endDuel', winner.toObject())
                        console.log(`${winner.name} coucou won the duel!`)
                        const resultEndGame = await postEndGame(room.iimGameId, room.userPlayerIimId, winner.userIim.iimId, winner.userIim.iimToken)
                        console.log(resultEndGame)
                        deleteRoom(room.roomId)
                    }
                }
            }
            io.in(room.roomId).emit('updateRoom', room.toObject)
        }
    } catch (e) {
        console.log(e)
        socket.emit("inGameError", e.message)
    }
}
