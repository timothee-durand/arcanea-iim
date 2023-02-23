
import {createServer} from "http";
import {Server} from "socket.io";
import {router} from "./api";
import helmet from "helmet";
// @ts-ignore
const cors = require("cors");
const express = require("express");
import {joinRoom, leaveRoom,playCard} from "./socket";

const app = express();
app.use(helmet());
app.use(cors({
    origin: '*',
}))
app.use("/api", router)

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: true,
    }
}
);
const port = process.env.PORT || 3000






io.on('connection', (socket) => {
    socket.on("joinRoom", async (roomId, username, password) => {
        await joinRoom(io, socket, roomId, username, password)
    })

    socket.on("playCard", async (roomId, userId, cardName) => {
        console.log(`${cardName} try added to board by ${userId}`)
        await playCard(io, socket, roomId, userId, cardName)
    })

    socket.on("leaveRoom", async (roomId, userId) => {
        await leaveRoom(io, socket, roomId, userId)
        console.log(`${userId} leave  ${roomId}`)
    })

    socket.on('disconnect', () => {
        console.log("user disco")
    })
})

httpServer.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

