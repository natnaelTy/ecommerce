import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

export const verifyToken = (req, res, next) => {

    const token = req.cookies.token;
    try{
        
    if(!token){
        return res.status(401).json({success: true, message: "Unauthorized, no token provided"});
    }
       const decoded = jwt.verify(token, process.env.JWT_SECRECT);

       if(!decoded){
        return res.status(401).json({success: false, message: "Unauthorized - invalid token"});
       }

       res.userId = decoded.userId;
       next();
    }catch(err){
        console.log('Error in verification', err);
        res.status(500).json({success: false, message: "server error"});
    }
}

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};