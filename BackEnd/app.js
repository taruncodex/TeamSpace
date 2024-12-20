import express from "express";
import "dotenv/config";
import { connect } from "mongoose";
import router from "./routes/routes.js";
import cors from "cors";
// import { User } from "./models/Users.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

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
    console.log("Listening : http://localhost:3000");
  } catch (error) {
    console.log("Error :", error);
  }
});
