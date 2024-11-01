import { AddTransaction } from "../../components/AddTransaction";
import { Balance } from "../../components/Balance";
import { Header } from "../../components/Header";
import { TransactionList } from "../../components/TransactionList";
import { useProjectContext } from "../../context";
import { useNavigate } from "react-router-dom";

const Root = () => {
    const { user, loading } = useProjectContext();
    const navigate = useNavigate();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        navigate("/auth");
        return null;
    }

    return (
        <>
            <main className='app-main'>
                <Header />
                <section className='container'>
                    <Balance />
                    <TransactionList />
                    <AddTransaction />
                    {user ? user.username : "no user"}
                </section>
            </main>
        </>
    );
};

export default Root;
