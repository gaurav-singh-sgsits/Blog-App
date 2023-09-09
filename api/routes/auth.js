import express from "express";
import { login, logout, register } from "../controllers/auth.js";

// to route these following end points to their respective controllers
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
