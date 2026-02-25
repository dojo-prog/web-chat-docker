import jwt from "jsonwebtoken";
import ENV from "../lib/env.js";
import User from "../models/user.model.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const accessToken = socket.handshake.headers.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];
    if (!accessToken) {
      console.log("Socket connection rejected: No token provided");
      throw new Error("Unauthorized - No token provided");
    }

    const decoded = jwt.verify(accessToken, ENV.ACCESS_TOKEN_SECRET);
    if (!decoded || !decoded.userId) {
      console.log("Socket connection rejected: Invalid token provided");
      throw new Error("Unauthorized - Invalid token provided");
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      console.error("Socket connection rejected: User not found");
      throw new Error("Unauthorized - User not found");
    }

    socket.user = user;
    socket.userId = user._id;

    console.log(
      `Socket authenticated for user ${user.fname} ${user.lname} (${user._id})`,
    );
    next();
  } catch (error) {
    next(error);
  }
};
