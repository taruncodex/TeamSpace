
import mongoose, { Schema, model } from "mongoose";

const workspaceSchema = new Schema({
    workSpaceName: { type: String, required: true },
    members: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        
        },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
});



export const Workspace = model("Workspaces", workspaceSchema);

