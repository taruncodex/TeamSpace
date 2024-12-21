import express from "express"
import protect from "../middlewares/authmiddleware.js"

import { 
    accessChat, 
    fetchChats, 
    createGroupChat, 
    removeFromGroup, 
    addToGroup, 
    renameGroup } from "../controllers/chatController.js"



const router = express.Router();

router.route("/").post(protect, accessChat )     // // "protect" the middleware for the getting specific user account details

router.route("/").get( protect, fetchChats)

router.route("/group").post(protect, createGroupChat)

router.route("/rename").put(protect, removeFromGroup)

router.route("/groupremove").put(protect, removeFromGroup)

router.route("/groupadd").put( protect, addToGroup)

export {router}

