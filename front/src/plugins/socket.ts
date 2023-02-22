import { io } from "socket.io-client";
import type { Plugin } from "vue";

export const Socket: Plugin = {
  install(app) {
    const socket = io(import.meta.env.DEV ? "http://localhost:3000" : "https://arcanea-api.onrender.com:3000");

    socket.on("connect", () => {
      console.log("Connected to socket");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket");
    });

    app.provide("socket", socket);
  },
};
