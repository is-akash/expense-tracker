/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    createContext,
    useReducer,
    ReactNode,
    useEffect,
    useState,
} from "react";
import axios from "axios";
import AppReducer from "./AppReducer";
import { ActionType, TransactionType, UserType } from "../types";
import { toast } from "sonner";

export interface State {
    user: UserType | null;
    transactions: TransactionType[];
    loading: boolean;
    addTransaction: (transaction: TransactionType) => Promise<void>;
    getTransactions: () => Promise<void>;
    deleteTransaction: (id: string) => Promise<void>;
    addUserData: (userData: UserType) => void;
}

const initialState: State = {
    user: null,
    transactions: [],
    loading: true,
    addTransaction: async () => {},
    getTransactions: async () => {},
    deleteTransaction: async () => {},
    addUserData: () => {},
};

const Context = createContext<State>(initialState);

const AppContext = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);
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

    const addUserData = async (userData: UserType) => {
        dispatch({
            type: ActionType.ADD_USER_DATA,
            payload: userData,
        });
    };

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (userData) {
            const parsedUserData = JSON.parse(userData);
            addUserData(parsedUserData);
            setLoading(false);
        }
    }, []);

    return (
        <Context.Provider
            value={{
                user: state.user,
                transactions: state.transactions,
                loading,
                addTransaction,
                getTransactions,
                deleteTransaction,
                addUserData,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export { Context, AppContext };
