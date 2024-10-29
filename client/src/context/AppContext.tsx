/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useReducer, ReactNode } from "react";
import axios from "axios";
import AppReducer from "./AppReducer";
import { ActionType, Transaction } from "../types";
import { toast } from "sonner";

export interface State {
    transactions: Transaction[];
    addTransaction: (transaction: Transaction) => Promise<void>;
    getTransactions: () => Promise<void>;
    deleteTransaction: (id: string) => Promise<void>;
}

const initialState: State = {
    transactions: [],
    addTransaction: async () => {},
    getTransactions: async () => {},
    deleteTransaction: async () => {},
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

    const addTransaction = async (transaction: Transaction) => {
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

    return (
        <Context.Provider
            value={{
                transactions: state.transactions,
                addTransaction,
                getTransactions,
                deleteTransaction,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export { Context, AppContext };
