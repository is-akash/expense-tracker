export type ExpenseType = "income" | "expense";

export interface TransactionType {
    transactionId: string;
    text: string;
    amount: number;
    expenseType: ExpenseType;
    createdAt?: string;
}

export interface UserType {
    id: string;
    username: string;
    email: string;
    access_token: string;
    created_at: string;
}

// actionTypes.ts
export enum ActionType {
    ADD_USER_DATA = "ADD_USER_DATA",
    GET_TRANSACTIONS = "GET_TRANSACTIONS",
    DELETE_TRANSACTION = "DELETE_TRANSACTION",
    ADD_TRANSACTION = "ADD_TRANSACTION",
}

interface AddUserAction {
    type: ActionType.ADD_USER_DATA;
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
    | AddUserAction
    | GetTransactionsAction
    | DeleteTransactionAction
    | AddTransactionAction;

export interface AxiosErrorType {
    message: string; // Error message
    name: string; // Name of the error (AxiosError)
    stack: string; // Stack trace, useful for debugging
    config: {
        transitional: {
            silentJSONParsing: boolean;
            forcedJSONParsing: boolean;
            clarifyTimeoutError: boolean;
        };
        adapter: string[]; // Array of adapters like 'xhr', 'http', 'fetch'
        timeout: number; // Timeout value (0 means no timeout)
        xsrfCookieName: string;
        xsrfHeaderName: string;
        maxContentLength: number; // Max content length (use -1 for no limit)
        maxBodyLength: number; // Max body length (use -1 for no limit)
        env: Record<string, unknown>; // Custom environment properties
        headers: Record<string, string>; // HTTP request headers
        method: string; // HTTP method (e.g., 'post', 'get')
        url: string; // URL of the request
        data: string; // The request payload (e.g., body data sent)
    };
    code: string; // Error code (e.g., 'ERR_BAD_REQUEST')
    status: number; // HTTP status code (e.g., 401)
}
