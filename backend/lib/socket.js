import { Server } from "socket.io";
import e from "express";
import http from "http";
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";
import ENV from "./env.js";

const app = e();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

export { app, server, io };
