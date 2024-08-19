import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  userProfile,
  updateUserProfile,
} from "../Controllers/userController.js";

router.post("/register", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(userProfile).put(updateUserProfile);

export default router;
