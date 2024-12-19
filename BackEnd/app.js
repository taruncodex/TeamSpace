import express from "express";
import "dotenv/config";
import { connect } from "mongoose";
import router from "./routes/routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// error handling middle ware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.use(router);

app.listen(process.env.PORT, async () => {
  try {
    await connect(process.env.DATABASE_URL);
    console.log("Database connected successfully");
    console.log("Listening : http://localhost:3000 ");
  } catch (error) {
    console.log("Error :", error);
  }
});
