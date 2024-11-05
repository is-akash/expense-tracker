/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./AuthPage.css";
import { toast } from "sonner";
import { Icons } from "../../components/Icons";
import InputField from "../../components/InputField/InputField";
import axios from "axios";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

interface formDataType {
    email: string;
    password: string;
}
const initialFormData: formDataType = {
    email: "",
    password: "",
};

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
});

type activePage = "signin" | "signup";

const AuthPage = () => {
    const [activePage, setActivePage] = useState<activePage>("signin");
    const [step, setStep] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<formDataType>(initialFormData);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const navigate = useNavigate();
    const api = import.meta.env.VITE_API_BASE_URL;

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const result = formSchema.safeParse(formData);

        if (!result.success) {
            const errors = result.error.format();
            if (errors.email) {
                toast.error(errors.email._errors[0]);
            }
            if (errors.password) {
                toast.error(errors.password._errors[0]);
            }
            setIsLoading(false);
            return;
        }

        try {
            let response;
            if (activePage == "signup") {
                response = await axios.post(
                    `${api}/v1/auth/register`,
                    formData
                );
                toast("Please sign in to continue");
                setActivePage("signin");
            }

            if (activePage == "signin") {
                response = await axios.post(`${api}/v1/auth/login`, formData);

                localStorage.setItem(
                    "userData",
                    JSON.stringify(response.data.user)
                );
                navigate("/");
            }
            console.log(response);
            setFormData(initialFormData);
            setIsLoading(false);
            setStep(1);
            toast.success(response?.data.message);
        } catch (error: any) {
            console.log(error.response);
            toast.error(error.response?.data?.message);
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.currentTarget;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleOnIconClick = () => {
        setShowPassword((prev) => !prev);
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
                                    handleOnChange={handleFormChange}
                                    value={formData.email}
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
                                    type={showPassword ? "text" : "password"}
                                    id='user-password'
                                    icon={
                                        showPassword ? (
                                            <Icons.eyeOpen />
                                        ) : (
                                            <Icons.eyeClosed />
                                        )
                                    }
                                    handleOnIconClick={handleOnIconClick}
                                    handleOnChange={handleFormChange}
                                    value={formData.password}
                                />
                                <div className='btns'>
                                    <button
                                        type='button'
                                        onClick={() =>
                                            setStep((prev) => prev - 1)
                                        }
                                        disabled={isLoading}
                                    >
                                        Go Back
                                    </button>
                                    <button
                                        type='submit'
                                        onClick={(e) => handleFormSubmit(e)}
                                        disabled={isLoading}
                                    >
                                        {activePage == "signin"
                                            ? "Sign In"
                                            : "Sign up"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                    <div className='divider-container'>
                        <div className='divider' />
                        <span>Or Continue With</span>
                        <div className='divider' />
                    </div>
                    <div className='social-sign'>
                        <div className='social-icon'>
                            <Icons.google size='25px' />
                        </div>
                        <div className='social-icon'>
                            <Icons.gitHub size='25px' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuthPage;
