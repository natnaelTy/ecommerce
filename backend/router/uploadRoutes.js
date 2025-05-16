import { postedProducts, products, newArrival } from "../controllers/products.controller.js";
import multer from "multer";
import express from "express";


const productRoute = express.Router();

const upload = multer({ dest: 'uploads/' });

// Get all products 
productRoute.get("/products", products);

// Get new arrival products
productRoute.get("/newarrival", newArrival);
// Product Upload 
productRoute.post("/post-product", upload.single('image'), postedProducts);


export default productRoute;