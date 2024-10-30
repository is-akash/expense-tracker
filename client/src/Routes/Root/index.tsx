import { Toaster } from "sonner";
import { AddTransaction } from "../../components/AddTransaction";
import { Balance } from "../../components/Balance";
import { Header } from "../../components/Header";
import { TransactionList } from "../../components/TransactionList";

const Root = () => {
    return (
        <>
            <Toaster expand={true} closeButton />
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
