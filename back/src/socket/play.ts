import {findRoom} from "./singletons";
import {Server, Socket} from "socket.io";

export async function playCard(io: Server, socket: Socket, roomId: string, userId: string, cardName: string) {
    try {
        const room = findRoom(roomId)
        if (room) {
            room.addCardToBoard(cardName, userId)
            const turnResult = await room.tryPlayTurn()
            if(turnResult !== false) {
                io.in(room.roomId).emit('showBoard', room.boardObject)
                io.in(room.roomId).emit('pushActions', turnResult)

                for (const player of room.players) {
                    if(player.health <= 0) {
                        let winner = room.players.find(player => player.health > 0);
                        io.in(room.roomId).emit('endDuel', winner.toObject())
                        console.log(`${winner.name} coucou won the duel!`)
                    }
                }
            }
            io.in(room.roomId).emit('updateRoom', room.toObject)
        }
    } catch (e) {
        console.log(e)
        socket.emit("error", e)
    }

}
