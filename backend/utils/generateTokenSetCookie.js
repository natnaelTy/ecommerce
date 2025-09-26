import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export const generateTokenSetCookie = (res, userId, role) => {

    const token = jwt.sign({id: userId, role}, process.env.JWT_SECRET,{
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        httpOnly : true,
        sameSite : "strict",
        secure : true,
        maxAge : 7 * 24 * 60 * 60 * 1000,
    });

    return token;
}