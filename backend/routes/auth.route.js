import e from "express";
import {
  getAllContacts,
  getAllUserMessages,
  getAllUsers,
  sendMessage,
} from "../controllers/auth.controller.js";

const router = e.Router();

router.get("/", getAllUsers);
router.get("/contacts", getAllContacts);
router.get("/:userId", getAllUserMessages);
router.post("/:userId", sendMessage);

export default router;
