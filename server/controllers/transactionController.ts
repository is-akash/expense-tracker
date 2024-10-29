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

export const getTransactions = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const transactions = await TransactionModel.find();

        return res.status(200).json({
            count: transactions.length,
            data: transactions,
        });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({
            message: "Error while fetching transactions",
        });
    }
};

export const deleteTransaction = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { transactionId } = req.params;
    try {
        await TransactionModel.deleteOne({ transactionId: transactionId });

        res.status(200).json({
            message: "Transaction is deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};
