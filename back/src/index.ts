import * as express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {router} from "./api";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
        cors: {
            origin: true,
        }
    }
);
const port = process.env.PORT || 3000

app.use(router)

io.on('connection', (socket) => {
    console.log('user connected', socket.id);

    socket.on("joinRoom", rooms => {
        io.emit('roomName', rooms)
        socket.join(rooms.room)
    })

    socket.on("message", ({room, message}) => {
        io.emit('chatMessage', message);
        socket.to(room).emit("message", {
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

