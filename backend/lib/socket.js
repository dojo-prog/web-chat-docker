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

const userSocketMap = {};

export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

io.on("connection", (socket) => {
  const { user, userId } = socket;
  console.log(`A user connected: ${user.fname} ${user.lname}`);

  userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log(`A user disconnected: ${user.fname} ${user.lname}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
