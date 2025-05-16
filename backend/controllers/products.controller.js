import { pool } from "../db/mysqldb.js";
import dotenv from "dotenv";
import cloudinary from "./cloudinary folder/cloudinary.js";


dotenv.config();


export const products = (_, res) => {
  const productQuery = "SELECT * FROM products";

  pool.query(productQuery, (err, results) => {
    if (err) {
      console.log(err);
    }
    const product = results;
    res.status(200).json({success: true, product});
  });
};

// send new arrival prodcuts from the database
export const newArrival = (_, res) => {
  const newArrivalQuery = "SELECT * FROM newarrival JOIN products ON newarrival.product_id = products.id";
   pool.query (newArrivalQuery, (err, results) => {
    if(err) {
      console.log(err);
    }
    const newArrival = results;
    res.status(200).json({success: true, newArrival});
   });
}

export const postedProducts = async (req, res) => {
  const { name, description, price, category, brand, review, quantity} = req.body;
  const image = req.file ? req.file.path : null;

  try {
    if (!image || !name || !description || !price || !category || !brand || !review || !quantity) {
      return res.status(400).send("all fields are required");
    }

    const result = await cloudinary.uploader.upload(image, {
          folder: 'ecommerce-products',
        });
    
      // image url that sent to cloudinary  
     const imageUrl =  result.secure_url;

     const insertQuery = `INSERT INTO products (description, image, name, price, category, brand, review, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    pool.query(
      insertQuery,
      [description, imageUrl, name, price, category, brand, review, quantity],
      (err, results) => {
        if (err) {
          console.error("Error creating product:", err);
          return res.status(500).send("Server Error");
        }

        res.status(201).json({
          message: "Product created successfully",
          product: { id: results.insertId, name, description, imageUrl, category, price, brand, review, quantity},
        });
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json("Server error");
  }
};
