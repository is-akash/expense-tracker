import { useState } from "react";
// import { useProjectContext } from "../../context";
import "./RegisterPage.css";
import { toast } from "sonner";
import { Icons } from "../Icons";

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

const RegisterPage = () => {
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
                <h1 className='title'>Expense Tracker</h1>
                <p className='subtitle'>Login to access your account.</p>
                <form onSubmit={(e) => handleFormSubmit(e)}>
                    <div className='input-container'>
                        <input
                            type='text'
                            placeholder='username'
                            id='username'
                            required
                            name='username'
                            value={formData.username}
                            onChange={(e) => handleFormChange(e)}
                            className='input'
                        />
                    </div>
                    <div className='input-container'>
                        <input
                            type='email'
                            placeholder='you@example.com'
                            id='user-email'
                            required
                            name='email'
                            value={formData.email}
                            onChange={(e) => handleFormChange(e)}
                            className='input'
                        />
                    </div>
                    <div className='input-container'>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder='password'
                            id='user-password'
                            required
                            name='password'
                            value={formData.password}
                            onChange={(e) => handleFormChange(e)}
                            className='input'
                        />
                        <div
                            className='eye-icon'
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? (
                                <Icons.eyeOpen />
                            ) : (
                                <Icons.eyeClosed />
                            )}
                        </div>
                    </div>
                    <div className='input-container'>
                        <input
                            type={showCPassword ? "text" : "password"}
                            placeholder='confirm password'
                            id='confirm-user-password'
                            required
                            name='confirm_password'
                            value={formData.confirm_password}
                            onChange={(e) => handleFormChange(e)}
                            className='input'
                        />
                        <div
                            className='eye-icon'
                            onClick={() => setShowCPassword((prev) => !prev)}
                        >
                            {showCPassword ? (
                                <Icons.eyeOpen />
                            ) : (
                                <Icons.eyeClosed />
                            )}
                        </div>
                    </div>
                    <button
                        type='submit'
                        disabled={isLoading}
                        className={`submit-button ${
                            isLoading ? "isLoading" : ""
                        }`}
                    >
                        Sign up
                    </button>
                </form>
                <p className='login-text'>
                    Already have an account?{" "}
                    <span className='login-link'>
                        {/* <Link href='/auth/login'>Login</Link> */}
                    </span>{" "}
                </p>
            </div>
        </section>
    );
};

export default RegisterPage;
