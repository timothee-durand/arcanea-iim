import { io } from "socket.io-client";
import type { Plugin } from "vue";
import {BASE_URL} from "@/config";

export const Socket: Plugin = {
  install(app) {
    const socket = io(BASE_URL);

    socket.on("connect", () => {
      console.log("Connected to socket");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket");
    });

    app.provide("socket", socket);
  },
};
