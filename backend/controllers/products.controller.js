import prisma from "../prisma/prismaClient.js";
import dotenv from "dotenv";
import cloudinary from "./cloudinary folder/cloudinary.js";

dotenv.config();

// Get all products
export const products = async (_, res) => {
  try {
    const productList = await prisma.products.findMany();
    res.status(200).json({ success: true, products: productList });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get new arrivals with JOIN
export const newArrival = async (_, res) => {
  try {
    const newArrivals = await prisma.newarrival.findMany({
      include: {
        product: true,
      },
    });

    res.status(200).json({ success: true, newarrival: newArrivals });
  } catch (err) {
    console.error("Error fetching new arrivals:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Post new product
export const postedProducts = async (req, res) => {
  const { productName, description, price, category, brand, review, quantity, createdAt } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    if (!image || !productName || !description || !price || !category || !brand || !quantity) {
      return res.status(400).send("All fields are required");
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "ecommerce-products",
    });

    const imageUrl = result.secure_url;

    const newProduct = await prisma.products.create({
      data: {
        productName,
        description,
        image: imageUrl,
        price: parseFloat(price),
        category,
        brand,
        review: 0,
        createdAt,
        quantity: parseInt(quantity),
      },
    });

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
