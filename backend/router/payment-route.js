import express from "express";
import { InitializePayment, VerifyPayment } from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

// initialize payment
paymentRouter.post("/initialize", InitializePayment);
// verify payment
paymentRouter.get("/verify/:tx_ref", VerifyPayment);

export default paymentRouter;
