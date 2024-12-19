import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  refreshToken: { type: String },
});

export const User = new model("User", userSchema);
