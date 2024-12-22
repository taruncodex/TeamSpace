import jwt from "jsonwebtoken";

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
