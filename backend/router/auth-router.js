
import express from "express";
import { login, signup, googleCallback, googleLogin, verify } from "../controllers/auth.controller.js";
import passport from "passport";


const router = express.Router();

router.use(passport.initialize());

router.get("/google", googleLogin);

router.get("/google/login", googleCallback);

router.post("/signup", signup);

router.post("/login", login);

router.get("/verify", verify);


export default router;