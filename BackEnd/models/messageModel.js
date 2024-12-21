import mongoose, { mongo } from "mongoose";
import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "chat" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
},
    { timestamps: true }
);

const message = new model("message", messageSchema)

export default message;