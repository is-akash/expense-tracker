import { AddTransaction } from "./components/AddTransaction";
import { Header } from "./components/Header";

function App() {
    return (
        <main>
            <Header />
            <section className='container'>
                <AddTransaction />
            </section>
        </main>
    );
}

export default App;
