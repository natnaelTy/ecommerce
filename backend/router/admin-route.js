import express from "express";
import { createAdmin, loginAdmin, getAllUsers, getAllProducts } from "../controllers/admin.controller.js";


const adminRouter = express.Router();

// Admin login
adminRouter.post("/login", loginAdmin);
// Create admin
adminRouter.post("/createAdmin", createAdmin);
// Get all users
adminRouter.get("/users", getAllUsers);
// Get all products
adminRouter.get("/products", getAllProducts);

export default adminRouter;