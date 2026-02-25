import e from "express";
import {
  getAllContacts,
  getAllUserMessages,
  getAllUsers,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = e.Router();

router.use(protectRoute);

router.get("/", getAllUsers);
router.get("/contacts", getAllContacts);
router.get("/:userId", getAllUserMessages);
router.post("/:receiverId", sendMessage);

export default router;
