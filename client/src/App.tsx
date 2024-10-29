import { AddTransaction } from "./components/AddTransaction";
import { Balance } from "./components/Balance";
import { Header } from "./components/Header";
import { TransactionList } from "./components/TransactionList";

function App() {
    return (
        <main>
            <Header />
            <section className='container'>
                <Balance />
                <TransactionList />
                <AddTransaction />
            </section>
        </main>
    );
}

export default App;
