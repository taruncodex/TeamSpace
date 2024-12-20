import express from "express";
import { createUser, homePage, logIn } from "../controllers/controller.js";

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
router.post("/createWorkspace", createWorkspace);

// Route to get workspaces for a specific user
router.get("/workspaces/:userId", getWorkspacesByUser);

export default router;
