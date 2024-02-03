import { Server } from "http";
import { Server as SocketServer} from "socket.io";

export class ArcaneaSocket {
    static instance: ArcaneaSocket;
    private server: SocketServer;

    constructor(client: SocketServer) {
        this.server = client;
    }

    public static initInstance(httpServer: Server) : ArcaneaSocket {
        const io = new SocketServer(httpServer, {
                cors: {
                    origin: true,
                }
            }
        );
        ArcaneaSocket.instance = new ArcaneaSocket(io);
        return ArcaneaSocket.instance;
    }

    public static getClient(): SocketServer {
        if (!ArcaneaSocket.instance) {
            throw new Error('Socket server not initialized');
        }
        return ArcaneaSocket.instance.server;
    }
}