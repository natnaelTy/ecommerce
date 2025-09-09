import express from "express";
import {
  login,
  signup,
  googleCallback,
  googleLogin,
  getMe,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  updateUserProfile
} from "../controllers/auth.controller.js";
import passport from "passport";


const router = express.Router();
router.use(passport.initialize());


// Routes for authentication
router.get("/google", googleLogin);

router.get("/google/login", googleCallback);

router.post("/signup", signup);

router.post("/login", login);

router.post("/verifyEmail", verifyEmail);

router.post("/forgotPassword", forgotPassword);

router.post("/resetPassword/:token", resetPassword);

router.post("/logout", logout);

router.get("/me", getMe);

router.put("/me", updateUserProfile);

export default router;
