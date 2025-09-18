import express from "express";
import  router  from "./router/auth-router.js";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import uploadRoutes from "./router/uploadRoutes.js";
import prisma  from "./prisma/prismaClient.js";
import notificationRouter from "./router/notificationRoutes.js";
import adminRouter from "./router/admin-route.js";
import paymentRouter from "./router/payment-route.js";


dotenv.config();

const app = express();
app.use(passport.initialize());

app.use(cors({origin: "http://localhost:5173", credentials: true}));


app.use(express.json());
app.use(cookieParser());

const PORT = 5000 || 3000

prisma
  .$connect()
  .then(() => {
    console.log("✅ Connected to database via Prisma!");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });
// user routes
app.use("/api/auth", router);
// product routes
app.use("/api/products", uploadRoutes);
// notification routes
app.use("/api/auth/notifications", notificationRouter);
// admin routes
app.use("/api/admin", adminRouter);
// payment routes
app.use("/api/payment", paymentRouter);

app.listen(PORT, () => {
    console.log(`Server is is running on ${PORT}`);
})