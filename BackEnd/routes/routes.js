import express from "express";
import { createUser, logIn } from "../controllers/controller.js";

const router = express.Router();

router.post("/sign-up", createUser);
router.post("/login", logIn);

export default router;
