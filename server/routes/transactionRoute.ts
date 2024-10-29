import { Router } from "express";
import { addTransaction } from "../controllers/transactionController.js";

const router = Router();

router.post("/", addTransaction);

export default router;
