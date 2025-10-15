import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import passportConfig from "./utils/passport.config.js";
import productRoute from "./router/product-route.js";
import prisma from "./prisma/prismaClient.js";
import notificationRouter from "./router/notificationRoutes.js";
import adminRouter from "./router/admin-route.js";
import paymentRouter from "./router/payment-route.js";
import userRouter from "./router/auth-router.js";
import chatbotRouter from "./router/chatbot-router.js";

dotenv.config();

const app = express();
app.use(passportConfig.initialize());


const allowedOrigins = ["https://ecommerce-blue-beta-93.vercel.app"];

app.use(
  cors({
    origin: (origin, callback) => {

      if (!origin) return callback(null, true);

      const isAllowed =
        allowedOrigins.includes(origin) ||
        /\.sevalla\.app$/.test(origin) ||
        /\.sevalla\.page$/.test(origin);

      if (isAllowed) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});

prisma
  .$connect()
  .then(() => {
    console.log("✅ Connected to database via Prisma!");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });

// user routes
app.use("/api/auth", userRouter);
// product routes
app.use("/api/products", productRoute);
// notification routes
app.use("/api/notifications", notificationRouter);
// admin routes
app.use("/api/admin", adminRouter);
// payment routes
app.use("/api/payment", paymentRouter);
// chatbot routes
app.use("/api", chatbotRouter);
