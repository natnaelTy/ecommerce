import express from "express";
import { createAdmin, loginAdmin, getAllUsers, getAllProducts, getAllOrders, getAllPayments, addProduct, editProduct, deleteProduct } from "../controllers/admin.controller.js";


const adminRouter = express.Router();

// Admin login
adminRouter.post("/login", loginAdmin);

// Create admin
adminRouter.post("/createAdmin", createAdmin);

// Get all users
adminRouter.get("/users", getAllUsers);

// Get all products
adminRouter.get("/products", getAllProducts);

// Add a new product
adminRouter.post("/products", addProduct);

// Edit a product
adminRouter.put("/products/edit/:id", editProduct);

// Delete a product
adminRouter.delete("/products/:id", deleteProduct);

// get all the orders
adminRouter.get("/orders", getAllOrders);

// Get all payments
adminRouter.get("/payments", getAllPayments);



export default adminRouter;