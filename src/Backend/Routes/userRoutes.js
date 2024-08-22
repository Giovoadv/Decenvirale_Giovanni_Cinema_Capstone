import express from "express";
const router = express.Router();
// import {
//   authUser,
//   registerUser,
//   logoutUser,
//   userProfile,
//   updateUserProfile,
// } from "../Controllers/userController.js";
import {
  addSignUp,
  authenticate,
  destroySession,
  getAuthStatus,
  authRequired,
} from "../Controllers/authController.js";
import { protect } from "../Middleware/authMiddleware.js";

router.post("/signup", addSignUp);
router.post("/authenticate", authenticate);
router.post("/logout", authRequired, destroySession);
router.get("/status", getAuthStatus);

// router.post("/register", registerUser);
// router.post("/login", authUser);
// router.post("/logout", logoutUser);
// router
//   .route("/profile")
//   .get(protect, userProfile)
//   .put(protect, updateUserProfile);

export default router;
