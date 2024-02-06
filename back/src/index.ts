import {createServer} from "http";
import helmet from "helmet";
// @ts-ignore
const cors = require("cors");
const express = require("express");
import {joinRoom, leaveRoom, playCard} from "./socket";
import {ArcaneaSocket} from "./services/socket";
import {RedisClient} from "./services/redis";


async function start() {
    const app = express();
    app.use(helmet());
    app.use(cors({
        origin: '*',
    }))

    app.get('/', (req, res) => {
        res.send({
            message: "Welcome to Arcanea"
        })
    })

    app.get('/health', (req, res) => {
        res.send('ok')
    })

    const httpServer = createServer(app);
    ArcaneaSocket.initInstance(httpServer)
    // await RedisClient.initInstance()
    const port = process.env.PORT || 3000


    ArcaneaSocket.getClient().on('connection', (socket) => {
        socket.on("joinRoom", async (roomId: string, username: string) => {
            await joinRoom({socket, idRooms: roomId, userName: username})
        })

        socket.on("playCard", async (roomId, userId, cardName) => {
            console.log(`${cardName} try added to board by ${userId}`)
            await playCard({socket, roomId, userId, cardName})
        })

        socket.on("leaveRoom", async (roomId, userId) => {
            await leaveRoom({socket, roomId, userId})
            console.log(`${userId} leave  ${roomId}`)
        })

        socket.on('disconnect', () => {
            console.log("user disco")
        })
    })

    httpServer.listen(port, function () {
        console.log(`Listening on port ${port}`);
    });


}

start()