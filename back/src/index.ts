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

let rooms = [];

io.on('connection', (socket) => {
    
    socket.on("joinRoom", (idRooms, userName) => {
        io.in(idRooms).emit('roomName', idRooms, userName) 
        rooms.push(
            {
                roomsId: idRooms,
                roomUsername: userName
            }
        )
        rooms.map(rooms => {
            if (idRooms === rooms.roomsId) {
                    io.in(rooms.roomsId).fetchSockets()
                } else {
                    socket.to(rooms.roomsId).emit("some event")
                }
            }
        )
    })

    socket.on("message", ({idRoom, message}) => {
        io.in(idRoom).emit('chatMessage', message);
        socket.to(idRoom).emit("message", {
            message
        })
    })

    socket.on('disconnect', () => {
        console.log("user disco")
    })
})

httpServer.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

