import prisma from "../prisma/prismaClient.js";
import bcrypt from "bcryptjs";
import cloudinary from "./cloudinary folder/cloudinary.js";
import { generateTokenSetCookie } from "../utils/generateTokenSetCookie.js";
import jwt from "jsonwebtoken";


// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// create admin
export const createAdmin = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const checkAdmin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });
    if (checkAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });
    // Generate token and set cookie
    const token = generateTokenSetCookie(res, admin.id, "ADMIN");
    res.status(200).json({ message: "Admin created successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

// login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    // Generate token and set cookie
    const token = generateTokenSetCookie(res, admin.id, "ADMIN");

    res.json({ message: "Login successful", admin, token });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get admin profile
export const getAdminProfile = async (req, res) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    const adminId = decoded.id;

    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
    });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.json({ message: "Admin profile fetched successfully", admin });
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// logout
export const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out admin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// add new product
export const addProduct = async (req, res) => {
  const {
    productName,
    description,
    price,
    category,
    color,
    material,
    weight,
    brand,
  } = req.body;
  const imagePath = req.file && req.file.path;

  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "ecommerce-products",
    });

    const newProduct = await prisma.products.create({
      data: {
        productName,
        description,
        price: Number(price),
        category,
        image: result.secure_url,
        color,
        material,
        weight: Number(weight),
        brand,
        review: 0,
        quantity: 1,
      },
    });
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get all the products
export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// edit product
export const editProduct = async (req, res) => {
  const { id } = req.params;
  const { productName, description, price, category } = req.body;
  const image = req.file && req.file.path;
  try {
    // Check if product exists
    const existingProduct = await prisma.products.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // update data
    const updateData = {
      productName:
        productName !== undefined ? productName : existingProduct.productName,
      description:
        description !== undefined ? description : existingProduct.description,
      price: price !== undefined ? Number(price) : existingProduct.price,
      category: category !== undefined ? category : existingProduct.category,
    };

    console.log(updateData);
    // Add image path if new image was uploaded
    if (image) {
      updateData.image = image;
    }

    const updatedProduct = await prisma.products.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// delete product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    cloudinary.uploader.destroy(id);
    await prisma.products.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get all the orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: { include: { product: true } },
        payment: true,
        user: true,
      },
    });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany();
    res.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//
