import express from "express";
import { createAdmin, loginAdmin, getAllUsers, getAllProducts, getAllOrders, getAllPayments } from "../controllers/admin.controller.js";


const adminRouter = express.Router();

// Admin login
adminRouter.post("/login", loginAdmin);
// Create admin
adminRouter.post("/createAdmin", createAdmin);
// Get all users
adminRouter.get("/users", getAllUsers);
// Get all products
adminRouter.get("/products", getAllProducts);
// Get all orders
adminRouter.get("/orders", getAllOrders);
// Get all payments
adminRouter.get("/payments", getAllPayments);


export default adminRouter;