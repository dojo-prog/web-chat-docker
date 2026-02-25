import e from "express";
import ENV from "../lib/env.js";
import cookieParser from "cookie-parser";
import connectDB from "../lib/db.js";
import authRouter from "../routes/auth.route.js";
import messageRouter from "../routes/message.route.js";
import { errorHandler } from "../middlewares/error.middleware.js";
import { app, server } from "../lib/socket.js";

const PORT = ENV.PORT || 5000;

app.use(e.json({ limit: "3mb" }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/messages", messageRouter);

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server connected to port ${PORT}`);
  connectDB();
});
