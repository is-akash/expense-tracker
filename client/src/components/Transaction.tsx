import { useProjectContext } from "../context";
import { numberWithCommas } from "../lib/utils";
import { TransactionType } from "../types";

interface TransactionProps {
    transaction: TransactionType;
}

const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
    const { deleteTransaction } = useProjectContext();

    const sign = transaction.expenseType === "expense" ? "-" : "+";

    return (
        <li
            className={transaction.expenseType === "expense" ? "minus" : "plus"}
        >
            {transaction.text}{" "}
            <span>
                {sign}${numberWithCommas(Math.abs(transaction.amount))}
            </span>
            <button
                onClick={() => deleteTransaction(transaction.transactionId)}
                className='delete-btn'
            >
                x
            </button>
        </li>
    );
};

export default Transaction;
