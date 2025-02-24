import jwt from "jsonwebtoken";

export const generateTokenSetCookie = (res, userId, email) => {

    const token = jwt.sign({userId, email}, process.env.JWT_SECRECT,{
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        httpOnly : true,
        sameSite : "strict",
        secure : true,
        maxAge : 7 * 24 * 60 * 60 * 1000,
    });

}