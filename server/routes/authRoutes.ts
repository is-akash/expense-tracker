import { Router } from "express";
import { login, registerUser } from "../controllers/authControllers.js";

const router = Router();

router.post("/login", login);
router.post("/register", registerUser);

export default router;
