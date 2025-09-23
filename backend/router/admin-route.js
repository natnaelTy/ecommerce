import express from "express";
import { getAllUsers, getAllProducts, getAllOrders, getAllPayments, addProduct, editProduct, deleteProduct,  } from "../controllers/admin.controller.js";
import multer from "multer";
import { getAdminProfile, logoutAdmin, createAdmin, loginAdmin, updateAdminProfile } from "../controllers/admin-auth.controller.js";


const upload = multer({ dest: "uploads/" });

const adminRouter = express.Router();

// Admin login
adminRouter.post("/auth/login", loginAdmin);

// Create admin
adminRouter.post("/auth/createAdmin", createAdmin);

// Get admin profile
adminRouter.get("/auth/profile", getAdminProfile);

// Update admin profile
adminRouter.put("/auth/edit-profile", updateAdminProfile);

// Admin logout
adminRouter.post("/auth/logout", logoutAdmin);

// Get all users
adminRouter.get("/users", getAllUsers);

// Get all products
adminRouter.get("/products", getAllProducts);

// Add a new product
adminRouter.post("/products/addProduct", upload.single("image"), addProduct);

// Edit a product
adminRouter.put("/products/edit/:id", upload.single("image"), editProduct);

// Delete a product
adminRouter.delete("/products/:id", deleteProduct);

// get all the orders
adminRouter.get("/orders", getAllOrders);

// Get all payments
adminRouter.get("/payments", getAllPayments);



export default adminRouter;