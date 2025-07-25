import express from "express";
import {
  login,
  signup,
  googleCallback,
  googleLogin,
  verify,
  logout,
  verifyEmailToReset, 
  verifyEmail,
  forgotPassword,
  resetPassword
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

router.post("/verifyEmail", verifyEmailToReset);

router.post("/forgotPassword", forgotPassword);

router.post("/resetPassword/:token", resetPassword);

router.post("/logout", logout);

router.get("/verify", verify);

export default router;
