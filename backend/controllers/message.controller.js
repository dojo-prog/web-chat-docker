import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password").lean();
    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const user = req.user;

    const messages = await Message.find({
      $or: [{ senderId: user._id }, { receiverId: user._id }],
    })
      .select("receiverId senderId")
      .lean();
    if (messages.length === 0) {
      return res.status(200).json({ success: true, contacts: [] });
    }

    const ids = [
      ...new Set(
        messages.map((m) =>
          m.senderId.toString() === user._id.toString()
            ? m.receiverId
            : m.senderId,
        ),
      ),
    ];

    const contacts = await User.find({ _id: { $in: ids } }).select("-password");

    res.status(200).json({ success: true, contacts });
  } catch (error) {
    next(error);
  }
};

export const getAllUserMessages = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      const err = new Error("No user Id provided from params");
      err.statusCode = 400;
      throw err;
    }

    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).sort({ createdAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const user = req.user;
    const { text, image } = req.body;
    const { receiverId } = req.params;

    if (!text && !image) {
      const err = new Error("No content passed");
      err.statusCode = 400;
      throw err;
    }

    if (!receiverId) {
      const err = new Error("No receiver Id provided from params");
      err.statusCode = 400;
      throw err;
    }

    const payload = {
      senderId: user._id,
      receiverId,
      text: text ?? null,
      image: image ?? null,
    };

    if (image) {
      try {
        const cloudinaryResponse = await cloudinary.uploader.upload(image, {
          folder: `web-chat-docker/sent-images/${user._id}`,
        });

        payload.image = cloudinaryResponse.secure_url;
      } catch (error) {
        throw error;
      }
    }

    const newMessage = await Message.create(payload);

    res.status(201).json({ success: true, newMessage });
  } catch (error) {
    next(error);
  }
};
