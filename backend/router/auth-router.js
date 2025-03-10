
import express from "express";
import { login, signup, googleCallback, googleLogin, verify, logout } from "../controllers/auth.controller.js";
import passport from "passport";
import { products } from "../controllers/products.controller.js";


const router = express.Router();

router.use(passport.initialize());

router.get("/google", googleLogin);

router.get("/google/login", googleCallback);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/verify", verify);

router.get("/products", products)

export default router;