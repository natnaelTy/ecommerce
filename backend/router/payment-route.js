import express from "express";
import { InitializePayment, VerifyPayment , getAllPayments, getPaymentByOrderId, getPaymentsByUserId } from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

// initialize payment
paymentRouter.post("/initialize", InitializePayment);
// verify payment
paymentRouter.get("/verify/:tx_ref", VerifyPayment);
// get all payments
paymentRouter.get("/payments", getAllPayments);
// get payment by order id
paymentRouter.get("/updatePayment/:orderId", getPaymentByOrderId);
// get payments by user id
paymentRouter.get("/user/:userId", getPaymentsByUserId);


export default paymentRouter;
