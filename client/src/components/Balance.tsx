import { useProjectContext } from "../context";
import { numberWithCommas } from "../lib/utils";

export const Balance = () => {
    const { transactions } = useProjectContext();

    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
        if (transaction.expenseType === "income") {
            incomeTotal += transaction.amount;
        } else if (transaction.expenseType === "expense") {
            expenseTotal += transaction.amount;
        }
    });

    return (
        <>
            <h4>Your Balance</h4>
            <h1>₹{numberWithCommas(incomeTotal - expenseTotal)}</h1>
            <div className='inc-exp-container'>
                <div>
                    <h4>Income</h4>
                    <p className='money plus'>
                        ${numberWithCommas(incomeTotal)}
                    </p>
                </div>
                <div>
                    <h4>Expense</h4>
                    <p className='money minus'>
                        ${numberWithCommas(expenseTotal)}
                    </p>
                </div>
            </div>
        </>
    );
};
