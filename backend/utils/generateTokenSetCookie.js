import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../prisma/prismaClient.js"; 

dotenv.config();

const ACCESS_EXPIRES = "15m";
const REFRESH_EXPIRES = "30d";
const REFRESH_COOKIE_NAME = "refreshToken";

export const generateTokenSetCookie = (res, userId, role) => {
  const token = jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

    res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export function signAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_EXPIRES });
}

function signRefreshToken(payload) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, {
    expiresIn: REFRESH_EXPIRES,
  });
}

function setRefreshCookie(res, token) {
  res.cookie(REFRESH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
}

export async function saveRefreshTokenForUser(userId, token) {
  try {
    await prisma.user.update({ where: { id: userId }, data: { refreshToken: token } });
  } catch (e) {
    console.warn("Could not save refresh token to DB:", e.message || e);
  }
}

export function issueTokens(res, userId, extra = {}) {
  const accessToken = signAccessToken({ id: userId, ...extra });
  const refreshToken = signRefreshToken({ id: userId });
  setRefreshCookie(res, refreshToken);
  saveRefreshTokenForUser(userId, refreshToken).catch(() => {});
  return { accessToken, refreshToken };
}
