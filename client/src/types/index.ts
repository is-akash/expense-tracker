export type ExpenseType = "income" | "expense";

export interface TransactionType {
    transactionId: string;
    text: string;
    amount: number;
    expenseType: ExpenseType;
}

// actionTypes.ts
export enum ActionType {
    GET_TRANSACTIONS = "GET_TRANSACTIONS",
    DELETE_TRANSACTION = "DELETE_TRANSACTION",
    ADD_TRANSACTION = "ADD_TRANSACTION",
}

interface GetTransactionsAction {
    type: ActionType.GET_TRANSACTIONS;
    payload: TransactionType[];
}

interface DeleteTransactionAction {
    type: ActionType.DELETE_TRANSACTION;
    payload: string;
}

interface AddTransactionAction {
    type: ActionType.ADD_TRANSACTION;
    payload: TransactionType;
}

export type Action =
    | GetTransactionsAction
    | DeleteTransactionAction
    | AddTransactionAction;
