import e from "express";
import {
  getAuthenticatedUser,
  login,
  logout,
  signup,
  updateProfilePicture,
} from "../controllers/auth.controller.js";

const router = e.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/profile-picture", updateProfilePicture);
router.post("/profile", getAuthenticatedUser);

export default router;
