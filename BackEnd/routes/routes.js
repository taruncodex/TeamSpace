import express from "express";
import { createUser, homePage, logIn } from "../controllers/controller.js";

const router = express.Router();

router.get("/", homePage);
router.post("/sign-up", createUser);
router.post("/login", logIn);

export default router;
