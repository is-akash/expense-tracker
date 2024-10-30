import { ActionType, Action } from "../types";
import { State } from "./AppContext";

const AppReducer = (state: State, action: Action) => {
    switch (action.type) {
        case ActionType.GET_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload,
            };
        case ActionType.DELETE_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.filter(
                    (transaction) =>
                        transaction.transactionId !== action.payload
                ),
            };
        case ActionType.ADD_TRANSACTION:
            return {
                ...state,
                transactions: [...state.transactions, action.payload],
            };
        case ActionType.SAVE_USER_DATA:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default AppReducer;
