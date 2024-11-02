import { useState } from "react";
// import { useProjectContext } from "../context";
import { v4 as uuidv4 } from "uuid";
import { ExpenseType, TransactionType } from "../types";

export const AddTransaction = () => {
    interface FormData {
        text: string;
        amount: number;
        expenseType: ExpenseType;
    }
    const initialFormData: FormData = {
        text: "",
        amount: 0,
        expenseType: "income",
    };

    const [formData, setFormData] = useState(initialFormData);

    // const { addTransaction } = useProjectContext();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTransaction: TransactionType = {
            transactionId: uuidv4(),
            text: formData.text,
            amount: formData.amount,
            expenseType: formData.expenseType,
        };

        // addTransaction(newTransaction);
    };

    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={onSubmit}>
                <div className='form-control'>
                    <label htmlFor='text'>Text</label>
                    <input
                        type='text'
                        value={formData.text}
                        name='text'
                        onChange={(e) => handleOnChange(e)}
                        placeholder='Enter text...'
                    />
                </div>
                <div className='form-control'>
                    <label htmlFor='amount'>Amount</label>
                    <input
                        type='number'
                        value={formData.amount}
                        name='amount'
                        onChange={(e) => handleOnChange(e)}
                        placeholder='Enter amount...'
                    />
                </div>
                <div className='form-control'>
                    <label htmlFor='amount'>Type of expense</label>
                    <select
                        id='expenseType'
                        name='expenseType'
                        value={formData.expenseType}
                        onChange={(e) => handleOnChange(e)}
                    >
                        <option value='income'>Income (+)</option>
                        <option value='expense'>Expense (-)</option>
                    </select>
                </div>
                <button className='btn'>Add transaction</button>
            </form>
        </>
    );
};
