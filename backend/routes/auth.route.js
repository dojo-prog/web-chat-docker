import e from "express";
import {
  getAuthenticatedUser,
  login,
  logout,
  refreshAccessToken,
  signup,
  updateProfilePicture,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = e.Router();

router.get("/profile", protectRoute, getAuthenticatedUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.patch("/profile-picture", protectRoute, updateProfilePicture);
router.post("/refresh-token", refreshAccessToken);

export default router;
