
import {createServer} from "http";
import {Server} from "socket.io";
import {router} from "./api";
import helmet from "helmet";
// @ts-ignore
import cors = require("cors");
import * as express from "express";
import {joinRoom} from "./socket";
import {playCard} from "./socket/play";

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
    socket.on("joinRoom", (roomId, username) => {
        joinRoom(io, socket, roomId, username)
    })

    socket.on("playCard", (roomId, userId, cardName) => {
        console.log(`${cardName} try added to board by ${userId}`)
        playCard(io, socket, roomId, userId, cardName)
    })

    socket.on("message", ({ idRoom, message }) => {
        io.in(idRoom).emit('chatMessage', message);
        socket.to(idRoom).emit("message", {
            message
        })
    })

    socket.on('disconnect', () => {
        console.log("user disco")
    })
})

httpServer.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

