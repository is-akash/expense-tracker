import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: [true, "Missing tracsaction id"],
    },
    text: {
        type: String,
        trim: true,
        required: [true, "Please add some text"],
    },
    amount: {
        type: Number,
        required: [true, "Please add a positive or negative number"],
    },
    expenseType: {
        type: String,
        required: [true, "Please Provide a expense type"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const TransactionModel = mongoose.model("Transaction", TransactionSchema);

export default TransactionModel;
