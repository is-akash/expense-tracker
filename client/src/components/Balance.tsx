import { useContext } from "react";
import { GlobalContext } from "../context/AppContext";
import { numberWithCommas } from "../lib/utils";

export const Balance = () => {
    const { transactions } = useContext(GlobalContext);

    const amounts = transactions.map(
        (transaction: { amount: number }) => transaction.amount
    );

    const total = amounts
        .reduce((acc: number, item: number) => (acc += item), 0)
        .toFixed(2);

    return (
        <>
            <h4>Your Balance</h4>
            <h1>${numberWithCommas(total)}</h1>
        </>
    );
};
