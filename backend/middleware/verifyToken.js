import jwt from "jsonwebtoken";


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