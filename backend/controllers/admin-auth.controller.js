import { generateTokenSetCookie } from "../utils/generateTokenSetCookie.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../prisma/prismaClient.js";

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
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
    // Generate token and set cookie
    const token = generateTokenSetCookie(res, admin.id, "ADMIN");

    res.status(200).json({
      message: "Login successful",
      admin: {
        id: admin.id,
        fullName: admin.fullName,
        email: admin.email,
        role: "ADMIN",
      },
      token,
    });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get admin profile
export const getAdminProfile = async (req, res) => {
  const token = req.cookies.token;
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

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        profilePhoto: true,
        role: true,
      },
    });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    console.log(admin);
    res
      .status(200)
      .json({ message: "Admin profile fetched successfully", admin });
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// update profile
export const updateAdminProfile = async (req, res) => {
  const token = req.cookies.token;
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

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        profilePhoto: true,
        role: true,
        password: true,
      },
    });
    if (!admin) {
      return res.status(404).json({ success: false, error: "Admin not found" });
    }

    const { fullName, email, profilePhoto, currentPassword, newPassword } =
      req.body;

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, error: "Current password is incorrect" });
    }

    const dataToUpdate = {
      fullName,
      email,
      profilePhoto,
    };

    if (newPassword && newPassword.trim() !== "") {
      dataToUpdate.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id: decoded.id },
      data: dataToUpdate,
    });
    res
      .status(200)
      .json({ message: "Profile updated successfully", updatedAdmin });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// logout
export const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out admin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
