import { postedProducts, products } from "../controllers/products.controller.js";
import multer from "multer";
import express from "express";


const productRoute = express.Router();

const upload = multer({ dest: 'uploads/' });

// Products routes
productRoute.get("/products", products);


// Product Upload Route
productRoute.post("/post-product", upload.single('image'), postedProducts);


export default productRoute;