import * as express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {router} from "./api";
import helmet from "helmet";
import cors = require("cors");

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



interface Room {
    roomId: string
    users: string[]
}

let rooms: Room[] = [];


io.on('connection', (socket) => {
    socket.on("joinRoom", (idRooms: string, userName: string) => {
        const room = rooms.find(r => {
            return r.roomId === idRooms
        })
        if (!room) {
            rooms.push(
                {
                    roomId: idRooms,
                    users: [userName]
                }
            )
        } else {
            room.users.push(userName)
        }
        socket.join(idRooms)
        io.in(idRooms).emit('roomName', idRooms, userName)
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

