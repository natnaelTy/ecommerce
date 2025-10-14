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
  updateUserProfile,
  changePassword
} from "../controllers/auth.controller.js";
import multer from "multer";
import passportConfig from "../utils/passport.config.js";


const userRouter = express.Router();
userRouter.use(passportConfig.initialize());

// multer for file uploads 
const upload = multer({ dest: "uploads/" });


// Routes for authentication
userRouter.get("/google", googleLogin);

userRouter.get("/google/login", googleCallback);

userRouter.post("/signup", signup);

userRouter.post("/login", login);

userRouter.post("/verifyEmail", verifyEmail);

userRouter.post("/forgotPassword", forgotPassword);

userRouter.post("/resetPassword/:token", resetPassword);

userRouter.post("/logout", logout);

userRouter.get("/me", getMe);

userRouter.put("/update-profile", upload.single("image"), updateUserProfile);

userRouter.put("/change-password", changePassword);

export default userRouter;
