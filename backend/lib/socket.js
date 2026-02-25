import { Server } from "socket.io";
import e from "express";
import http from "http";

const app = e();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});

export { app, server, io };
