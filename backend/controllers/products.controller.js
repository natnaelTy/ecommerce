import { pool } from "../db/mysqldb.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";


export const products = (req, res) => {
  const productQuery = "SELECT * FROM products";

  pool.query(productQuery, (err, results) => {
    if (err) {
      console.log(err);
    }
    const products = results;
    console.log(products);
    res.status(200).json({ success: true, products });
  });
};

// upload the image in multer storage

export const postedProducts = (req, res) => {
    console.log("Incoming request body:", req.body);
    console.log("Incoming file:", req.file);
  
    const { name, description, price } = req.body;
  
    try {
      if (!req.file) {
        return res.status(400).send("Image file is required");
      }
  
      // Get only the relative path from "upload/product/filename"
      let imgUrl = `upload/product/${req.file.filename}`;
  
      const insertQuery = `INSERT INTO products (description, image, name, price) VALUES (?, ?, ?, ?)`;
      pool.query(insertQuery, [description, imgUrl, name, price], (err, results) => {
        if (err) {
          console.error("Error creating product:", err);
          return res.status(500).send("Server Error");
        }
        console.log("Product inserted:", results);
  
        res.status(201).json({
          message: "Product created successfully",
          product: { id: results.insertId, name, description, image: imgUrl },
        });
      });
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json("Server error");
    }
}
