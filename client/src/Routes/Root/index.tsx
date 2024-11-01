import { AddTransaction } from "../../components/AddTransaction";
import { Balance } from "../../components/Balance";
import { Header } from "../../components/Header";
import { TransactionList } from "../../components/TransactionList";
import { useProjectContext } from "../../context";

const Root = () => {
    const { user } = useProjectContext();

    console.log(user);
    return (
        <>
            <main className='app-main'>
                <Header />
                <section className='container'>
                    <Balance />
                    <TransactionList />
                    <AddTransaction />
                </section>
            </main>
        </>
    );
};

export default Root;
