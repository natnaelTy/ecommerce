import express from "express";
import { createAdmin, loginAdmin } from "../controllers/admin.controller.js";


const adminRouter = express.Router();

// Admin login
adminRouter.post("/login", loginAdmin);
// Create admin
adminRouter.post("/createAdmin", createAdmin);


export default adminRouter;