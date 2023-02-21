import * as express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: true,
    }
}
);
const port = process.env.PORT || 8080

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

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

