import mongoose, { mongo } from "mongoose";
import { Schema, model } from "mongoose";

const chatModel = new Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},
    { timestamps: true }

);

const chat = new model("chat", chatModel)       // here c is in lowercase in "chatModel"

export default chat