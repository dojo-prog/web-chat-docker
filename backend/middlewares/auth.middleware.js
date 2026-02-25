import jwt from "jsonwebtoken";
import ENV from "../lib/env.js";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      const err = new Error("401 - Unauthenticated user");
      err.statusCode = 401;
      throw err;
    }

    const decoded = jwt.verify(accessToken, ENV.ACCESS_TOKEN_SECRET);
    if (!decoded || !decoded.userId) {
      const err = new Error("401 - Invalid access token");
      err.statusCode = 401;
      throw err;
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }

    req.user = user;

    next();
  } catch (error) {
    error.message = `protectRoute middleware error: ${error.message}`;
    next(error);
  }
};
