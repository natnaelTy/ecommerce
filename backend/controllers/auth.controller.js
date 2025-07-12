import prisma from "../prisma/prismaClient.js";
import bcrypt from "bcryptjs";
import { generateTokenSetCookie } from "../utils/generateTokenSetCookie.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateVerificationCode, sendEmail, sendVerificationCode } from "../utils/sendEmail.js";

dotenv.config();

// signup
export const signup = async (req, res) => {
  const { email, fullName, password, phoneNumber, createdAt } = req.body;

  try {
    if (!email || !fullName || !password || !phoneNumber) {
      return res.status(400).json({ error: "Fill all fields" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    const existPhoneNumber = await prisma.user.findUnique({
      where: { phoneNumber },
    });
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
      },
    });

    const token = generateTokenSetCookie(res, newUser.id, email, fullName);

    await sendVerificationCode(email, verificationCode)

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

    await sendEmail(
      newUser.email,
      "Welcome to Dvora Hub!",
      `<h1>Hello ${newUser.fullName}!</h1><p>Thanks for signing up 🥳</p>`
    );

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// verify email 
const verifyEmail = async (req, res) => {
  const { code } = req.body;
  const { token } = req.cookies.token;
  try{
    if(!token) {
      return res.status(401).json({success: false, message: "Please login or signup to verify your email"});
    }
    const user = await prisma.user.findUnique({
        where: {verificationCode: code}
    })
    if(!user) {
      return res.status(401).json({success: false, message: "Invalid or Expired verification code"});
    }
  }catch(err) {
    console.log(err)
  }
}
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

// Logout
export const logout = (_, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// Token verification
export const verify = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    res.status(200).json({ success: true, user: decoded });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
