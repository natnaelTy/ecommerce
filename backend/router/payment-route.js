import express from "express";
import { InitializePayment, VerifyPayment , getAllPayments, getPaymentByOrderId } from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

// initialize payment
paymentRouter.post("/initialize", InitializePayment);
// verify payment
paymentRouter.get("/verify/:tx_ref", VerifyPayment);
// get all payments
paymentRouter.get("/", getAllPayments);
// get payment by order id
paymentRouter.get("/payments/:orderId", getPaymentByOrderId);
export default paymentRouter;
