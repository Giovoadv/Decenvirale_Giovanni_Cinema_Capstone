import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  userProfile,
  updateUserProfile,
} from "../Controllers/userController.js";
import { protect } from "../Middleware/authMiddleware.js";

router.post("/register", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, userProfile)
  .put(protect, updateUserProfile);

export default router;
