import jwt from "jsonwebtoken";
<<<<<<< HEAD

const verifyToken = (req, res, next) => {
  console.log("verifyToken is begin.");

  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from header
  if (!token) return res.status(401).json({ error: "Token is required" });
  console.log("Token is received");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.locals = decoded; // Attach user info to request object
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default verifyToken;
=======
import { User } from "../models/Users.js";


const protect = async(req, res, next) => {
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1]

            //decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password")

            next();
        } catch (error) {
            res.status(401).send("not authorized, token failed")
        }
    }
    if(!token) {
        res.status(401).send("not authorized, no token provided")
    }
}


export {protect}
>>>>>>> samBE
