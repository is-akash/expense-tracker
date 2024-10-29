import { Request, Response } from "express";
import TransactionModel from "../database/TransactionModel.js";

export const addTransaction = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const transaction = await TransactionModel.create(req.body);

        return res.status(201).json({
            message: "new transaction created",
            data: transaction,
        });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({
            message: "Error while creating new transaction",
        });
    }
};
