import bcrypt from "bcryptjs";
import jwt, { decode } from "jsonwebtoken";
import User from "../models/user.model.js";
import ENV from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";
import { isEmailFormatValid } from "../utils/formatValid.js";
import returnMissingFields from "../utils/returnMissingFields.js";
import { capitalize } from "../utils/capitalize.js";

export const signup = async (req, res, next) => {
  try {
    const { fname, lname, email, password } = req.body;

    const missing = returnMissingFields({
      fname,
      lname,
      email,
      password,
    });
    if (missing.length > 0) {
      const err = new Error(`Missing value(s): ${missing.join(", ")}`);
      err.statusCode = 400;
      throw err;
    }

    const n = {
      fname: capitalize(fname),
      lname: capitalize(lname),
      email: email.toLowerCase().trim(),
    };

    const validEmail = isEmailFormatValid(n.email);

    if (!validEmail) {
      const err = new Error("Invalid email format");
      err.statusCode = 400;
      throw err;
    }

    if (password.length < 8) {
      const err = new Error("Password must at least be 8 characters long");
      err.statusCode = 400;
      throw err;
    }

    const existingUser = await User.findOne({ email: n.email });

    if (existingUser) {
      const err = new Error("Email already in use");
      err.statusCode = 400;
      throw err;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      fname: n.fname,
      lname: n.lname,
      email: n.email,
      password: hashedPassword,
    });

    setAuthTokens(createdUser._id, res);

    const newUser = createdUser.toObject();
    delete newUser.password;

    res
      .status(201)
      .json({ success: true, message: "Signup successful", user: newUser });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const missing = returnMissingFields({ email, password });
    if (missing.length > 0) {
      const err = new Error(`Missing value(s): ${missing.join(", ")}`);
      err.statusCode = 400;
      throw err;
    }

    const n = { email: email.toLowerCase().trim() };

    const validEmail = isEmailFormatValid(n.email);
    if (!validEmail) {
      const err = new Error("Invalid email format");
      err.statusCode = 400;
      throw err;
    }

    const user = await User.findOne({ email: n.email });
    if (!user) {
      const err = new Error("Invalid email or password");
      err.statusCode = 400;
      throw err;
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      const err = new Error("Invalid email or password");
      err.statusCode = 400;
      throw err;
    }

    setAuthTokens(user._id, res);

    const userObj = user.toObject();
    delete userObj.password;

    res
      .status(200)
      .json({ success: true, message: "Login successful", user: userObj });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "Strict",
    };

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

export const updateProfilePicture = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { image } = req.body;

    if (!userId) {
      const err = new Error("Failed to pass in user ID");
      err.statusCode = 400;
      throw err;
    }

    const missing = returnMissingFields({ image });
    if (missing.length > 0) {
      const err = new Error(`Missing value(s): ${missing.join(", ")}`);
      err.statusCode = 400;
      throw err;
    }

    const existingUser = await findById(userId).select("-password");
    if (!existingUser) {
      const err = new Error("User not found");
      err.statusCode = 400;
      throw err;
    }

    let imageUrl = "";
    let imagePublicId = "";

    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: `web-chat-docker/profile-pictures`,
      });

      imageUrl = cloudinaryResponse.secure_url;
      imagePublicId = cloudinaryResponse.public_id;
    } catch (error) {
      throw error;
    }

    const updated = await User.findByIdAndUpdate(
      userId,
      {
        profileImage: {
          url: imageUrl,
          publicId: imagePublicId,
        },
      },
      { returnDocument: "after" },
    );

    const updatedObj = updated.toObject();
    delete updatedObj.password;

    cloudinary.uploader.destroy(existingUser.profileImage.publicId);

    res
      .status(200)
      .json({
        success: true,
        message: "Profile picture updated",
        user: updatedObj,
      });
  } catch (error) {
    next(error);
  }
};

export const getAuthenticatedUser = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      const err = new Error("Refresh token not found");
      err.statusCode = 404;
      throw err;
    }

    const decoded = jwt.verify(refreshToken, ENV.REFRESH_TOKEN_SECRET);
    if (!decoded || !decoded.userId) {
      res.clearCookie("refreshToken");
      const err = new Error("Invalid refresh token");
      err.statusCode = 400;
      throw err;
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      ENV.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      },
    );

    res.cookie("accessToken", accessToken);

    res.status(201).json({ success: true, message: "Refreshed access token" });
  } catch (error) {
    next(error);
  }
};

// Helper
const setAuthTokens = (userId, res) => {
  if (!userId) throw new Error("Failed to pass userId");

  const accessToken = jwt.sign({ userId }, ENV.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, ENV.REFRESH_TOKEN_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
};
