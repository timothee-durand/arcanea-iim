import * as express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log("a user connected");
    console.log("socket", socket)
});

httpServer.listen(3000);

console.log('App Ready')
