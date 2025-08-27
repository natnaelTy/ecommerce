import prisma from "../prisma/prismaClient.js";
import bcrypt from "bcryptjs";
import { generateTokenSetCookie } from "../utils/generateTokenSetCookie.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  generateVerificationCode,
  sendEmail,
  sendVerificationCode,
} from "../utils/sendEmail.js";
import crypto from "crypto";

dotenv.config();

// signup
export const signup = async (req, res) => {
  const { email, fullName, password, phoneNumber, createdAt } = req.body;

  try {
    if (!email || !fullName || !password || !phoneNumber) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    const existPhoneNumber = await prisma.user.findUnique({
      where: { phoneNumber },
    });
    // check if user already
    if (existingUser || existPhoneNumber) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        phoneNumber,
        createdAt,
        verificationCode,
        verificationCodeExpiresAt: new Date(Date.now() + 3600000), // 1 hour
      },
    });

    const token = generateTokenSetCookie(res, newUser.id, email, fullName);

    await sendVerificationCode(email, verificationCode);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        fullName: newUser.fullName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        token,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Verify Email
export const verifyEmailToReset = async (req, res) => {
  const { code } = req.body;
  try {
    // Find user by verification code
    const user = await prisma.user.findFirst({
      where: { verificationCode: code },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    // Mark user as verified and clear the code
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationCode: null,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// verify email
export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  const { token } = req.cookies;

  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login or signup to verify your email",
      });
    }

    const user = await prisma.user.findFirst({
      where: { verificationCode: code },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or Expired verification code",
      });
    }

    // Mark user as verified and clear the code
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        verificationCode: null,
      },
    });

    await sendEmail(
      user.email,
      "Welcome to Dvora Hub!",
      `<h1>Hello ${user.fullName}!</h1><p>Thanks for signing up 🥳</p>`
    );

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email or password is incorrect" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res
        .status(400)
        .json({ success: false, message: "Email or password is incorrect" });
    }

    const token = generateTokenSetCookie(
      res,
      user.id,
      user.email,
      user.fullName
    );

    res
      .status(200)
      .json({ success: true, message: "Login successful", user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    await prisma.user.update({
      where: { email },
      data: {
        resetPasswordCode: resetToken,
        resetPasswordCodeExpiresAt: resetTokenExpiry,
      },
    });

    // Send reset email
    const resetUrl = `http://localhost:5173/resetpassword?token=${resetToken}`;
    await sendEmail(
      email,
      "Password Reset Request",
      `<h1>Password Reset</h1>
       <p>We received a request to reset your password.</p>
       <p>If you did not make this request, please ignore this email.</p>
      <p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 1 hour.</p>`
    );

    res
      .status(200)
      .json({ success: true, message: "Reset link sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// reset password
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    // Find user by reset token
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordCode: token,
        resetPasswordCodeExpiresAt: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordCode: null,
        resetPasswordCodeExpiresAt: null,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Logout
export const logout = (_, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// Token verification and get user details
export const getMe = async (req, res) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        fullName: true,
        phoneNumber: true,
        isEmailVerified: true
      },
    });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error in getMe:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Google OAuth2
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRECT,
      callbackURL: process.env.CALLBACKURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const fullName = profile.displayName;

        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          const hashedPassword = await bcrypt.hash("", 10);
          user = await prisma.user.create({
            data: {
              fullName,
              email,
              user_password: hashedPassword,
            },
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google OAuth2 Login Route
export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Google OAuth2 Callback
export const googleCallback = (req, res, next) => {
  passport.authenticate("google", (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login");

    const token = generateTokenSetCookie(
      res,
      user.id,
      user.email,
      user.fullName
    );
    res.redirect(`http://localhost:5173?token=${token}`);
  })(req, res, next);
};

// Get Profile
export const getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        email: true,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Database error" });
  }
};
