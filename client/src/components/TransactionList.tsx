import { useEffect } from "react";

import { useProjectContext } from "../context";
import Transaction from "./Transaction";

export const TransactionList = () => {
    const { transactions, getTransactions } = useProjectContext();

    useEffect(() => {
        getTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h3>History</h3>
            <ul className='list'>
                {transactions.map((transaction) => (
                    <Transaction
                        key={transaction.transactionId}
                        transaction={transaction}
                    />
                ))}
            </ul>
        </>
    );
};
