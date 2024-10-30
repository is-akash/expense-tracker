export type ExpenseType = "income" | "expense";

export interface TransactionType {
    transactionId: string;
    text: string;
    amount: number;
    expenseType: ExpenseType;
    createdAt?: string;
}

export interface UserType {
    userId: string;
    username: string;
    email: string;
    access_token: string;
    created_at: string;
}

// actionTypes.ts
export enum ActionType {
    SAVE_USER_DATA = "SAVE_USER_DATA",
    GET_TRANSACTIONS = "GET_TRANSACTIONS",
    DELETE_TRANSACTION = "DELETE_TRANSACTION",
    ADD_TRANSACTION = "ADD_TRANSACTION",
}

interface SaveUserAction {
    type: ActionType.SAVE_USER_DATA;
    payload: UserType;
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
    | SaveUserAction
    | GetTransactionsAction
    | DeleteTransactionAction
    | AddTransactionAction;
