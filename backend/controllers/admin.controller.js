import prisma from "../prisma/prismaClient.js";
import bcrypt from "bcryptjs";

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

    res.json({ message: "Login successful", admin });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

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
    await prisma.admin.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });
    res.status(200).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

// logout
export const logoutAdmin = async (req, res) => {
  try {
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out admin:", error);
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

// get all the orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { orderItems: { include: { product: true } }, payment: true, user: true },
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