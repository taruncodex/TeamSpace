import express from "express";
import verifyToken from "../middlewares/authmiddleware.js";
import { createUser, homePage, logIn } from "../controllers/controller.js";
import {
  refreshToken,
  forgotPassword,
  resetPassword,
} from "../controllers/ForgetPaasowrd.js";
import {
  createWorkspace,
  getWorkspacesByUser,
} from "../controllers/workspaceController.js";

const router = express.Router();

router.get("/", homePage);
router.post("/sign-up", createUser);
router.post("/login", logIn);
router.get("/token", refreshToken);
router.post("/api/forgot-password", forgotPassword);
router.post("/api/reset-password", resetPassword);

// Route to create a workspace
router.post("/createWorkspace", verifyToken, createWorkspace);
// Route to get workspaces for a specific user
router.get("/workspaces/:userId", verifyToken, getWorkspacesByUser);

export default router;
