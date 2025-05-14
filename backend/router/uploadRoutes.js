import { postedProducts, products } from "../controllers/products.controller.js";
import multer from "multer";
import express from "express";


const productRoute = express.Router();

const upload = multer({ dest: 'uploads/' });

// get Products 
productRoute.get("/products", products);


// Product Upload 
productRoute.post("/post-product", upload.single('image'), postedProducts);


export default productRoute;