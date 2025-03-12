import express from "express";
import {
  login,
  signup,
  googleCallback,
  googleLogin,
  verify,
  logout,
} from "../controllers/auth.controller.js";
import passport from "passport";
import { postedProducts, products } from "../controllers/products.controller.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const router = express.Router();
router.use(passport.initialize());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes for authentication
router.get("/google", googleLogin);

router.get("/google/login", googleCallback);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/verify", verify);
// Products routes
router.get("/products", products);

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../upload/product");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Product Upload Route
router.post("/post-product", upload.single("imgUrl"), postedProducts);

export default router;
