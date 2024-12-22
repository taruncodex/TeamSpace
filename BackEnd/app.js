import express from "express";
import "dotenv/config";
import { connect } from "mongoose";
import router from "./routes/routes.js";
import cors from "cors";
// import { User } from "./models/Users.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  "https://verdant-ganache-92b6a3.netlify.app",
  "https://teamspace.onrender.com"
];

// CORS middleware to handle multiple origins
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g., mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Deny the request
      }
    },
  })
);

app.use(express.json());

// error handling middle ware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.use(router);

app.listen(process.env.PORT || 3000, async () => {
  try {
    await connect(
      "mongodb+srv://shambhu04kumar:123456mongodb@cluster0.auxyo.mongodb.net/workspaces"
    );
    console.log("Database connected successfully");
    console.log(
      "Listening : http://localhost:3000 and  https://teamspace.onrender.com "
    );
  } catch (error) {
    console.log("Error :", error);
  }
});
