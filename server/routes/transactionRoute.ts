import { Router } from "express";
import {
    addTransaction,
    deleteTransaction,
    getTransactions,
} from "../controllers/transactionController.js";

const router = Router();

router.get("/", getTransactions);
router.post("/", addTransaction);
router.delete("/:transactionId", deleteTransaction);

export default router;
