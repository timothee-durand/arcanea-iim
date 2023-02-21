import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import {router} from "./api";
import helmet from "helmet";
// @ts-ignore
import cors = require("cors");
import {Duel} from "@/core/duel/Duel";

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


const cards = [
    {
        key: "expelliarmus",
        title: "Expelliarmus",
        description: "Expelliarmus is a spell that disarms the target.",
        image: "https://vignette.wikia.nocookie.net/harrypotter/images/3/3e/Expelliarmus.jpg/revision/latest?cb=20170701182529",
    }
]

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

