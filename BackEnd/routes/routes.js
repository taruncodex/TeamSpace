import express from "express";
import { createUser, homePage, logIn } from "../controllers/controller.js";
import verifyToken from "../middlewares/authmiddleware.js";

// importing the create workspace route
import {
  createWorkspace,
  getWorkspacesByUser,
} from "../controllers/workspaceController.js";

const router = express.Router();

router.get("/", homePage);
router.post("/sign-up", createUser);
router.post("/login", logIn);

// Route to create a workspace
router.post("/createWorkspace", verifyToken, createWorkspace);

// Route to get workspaces for a specific user
router.get("/workspaces/:userId", verifyToken, getWorkspacesByUser);

export default router;
