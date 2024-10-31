import { useState } from "react";
// import { useProjectContext } from "../../context";
import "./AuthPage.css";
import { toast } from "sonner";
import { Icons } from "../../components/Icons";
import InputField from "../../components/InputField/InputField";

interface formDataType {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}
const initialFormData: formDataType = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
};

type activePage = "signin" | "signup";

const AuthPage = () => {
    const [activePage, setActivePage] = useState<activePage>("signin");
    const [step, setStep] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<formDataType>(initialFormData);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showCPassword, setShowCPassword] = useState<boolean>(false);
    // const { saveUserData } = useProjectContext();

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if (formData.password !== formData.confirm_password) {
            toast.error("Password doesn't match try again.");
            return;
        }
        // const { username, email, password } = formData;
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.currentTarget;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <section className='register-main'>
            <div className='container'>
                <div className='container-left'>
                    <div className='text-container'>
                        <span>Managing</span> <span>money, made</span>
                        <span>simple.</span>
                    </div>
                    <div />
                </div>
                <div className='container-right'>
                    <h1 className='title'>ManageExpense</h1>
                    <h3 className='welcome'>Welcome Back</h3>
                    <p className='subtitle'>
                        Welcome Back, Please enter your details
                    </p>
                    <div className='btn-container'>
                        <button
                            className={`${activePage === "signin" && "active"}`}
                            onClick={() => setActivePage("signin")}
                        >
                            Sign In
                        </button>
                        <button
                            className={`${activePage === "signup" && "active"}`}
                            onClick={() => setActivePage("signup")}
                        >
                            Sign up
                        </button>
                    </div>
                    <form
                        onSubmit={(e) => handleFormSubmit(e)}
                        className='auth-form'
                    >
                        {step == 1 && (
                            <div className='step'>
                                <InputField
                                    placeholder='example@gmail.com'
                                    label='Email Address'
                                    name='email'
                                    type='email'
                                    id='user-email'
                                    icon={<Icons.mail />}
                                />
                                <button
                                    type='button'
                                    onClick={() => setStep((prev) => prev + 1)}
                                >
                                    Continue
                                </button>
                            </div>
                        )}
                        {step == 2 && (
                            <div className='step'>
                                <InputField
                                    placeholder='password'
                                    label='Password'
                                    name='password'
                                    type='password'
                                    id='user-password'
                                    icon={<Icons.eyeClosed />}
                                />
                                <div className='btns'>
                                    <button
                                        type='button'
                                        onClick={() =>
                                            setStep((prev) => prev - 1)
                                        }
                                    >
                                        Go Back
                                    </button>
                                    <button
                                        type='submit'
                                        onClick={(e) => handleFormSubmit(e)}
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AuthPage;
