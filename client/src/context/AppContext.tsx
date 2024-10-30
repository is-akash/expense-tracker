/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useReducer, ReactNode } from "react";
import axios from "axios";
import AppReducer from "./AppReducer";
import { ActionType, TransactionType, UserType } from "../types";
import { toast } from "sonner";

export interface State {
    user: UserType | null;
    transactions: TransactionType[];
    addTransaction: (transaction: TransactionType) => Promise<void>;
    getTransactions: () => Promise<void>;
    deleteTransaction: (id: string) => Promise<void>;
    saveUserData: (userData: UserType) => void;
}

const initialState: State = {
    user: null,
    transactions: [],
    addTransaction: async () => {},
    getTransactions: async () => {},
    deleteTransaction: async () => {},
    saveUserData: () => {},
};

const Context = createContext<State>(initialState);

// Provider component
const AppContext = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const getTransactions = async () => {
        try {
            const res = await axios.get("/api/v1/transactions");
            dispatch({
                type: ActionType.GET_TRANSACTIONS,
                payload: res.data.data,
            });
        } catch (err: any) {
            toast.error(err.response?.data?.error || "An error occurred");
        }
    };

    const deleteTransaction = async (id: string) => {
        try {
            await axios.delete(`/api/v1/transactions/${id}`);
            dispatch({
                type: ActionType.DELETE_TRANSACTION,
                payload: id,
            });
        } catch (err: any) {
            toast.error(err.response?.data?.error || "An error occurred");
        }
    };

    const addTransaction = async (transaction: TransactionType) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const res = await axios.post(
                "/api/v1/transactions",
                transaction,
                config
            );
            dispatch({
                type: ActionType.ADD_TRANSACTION,
                payload: res.data.data,
            });
        } catch (err: any) {
            toast.error(err.response?.data?.error || "An error occurred");
        }
    };

    const saveUserData = async (userData: UserType) => {
        dispatch({
            type: ActionType.SAVE_USER_DATA,
            payload: userData,
        });
    };

    return (
        <Context.Provider
            value={{
                user: state.user,
                transactions: state.transactions,
                addTransaction,
                getTransactions,
                deleteTransaction,
                saveUserData,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export { Context, AppContext };
