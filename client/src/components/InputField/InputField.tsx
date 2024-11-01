import { Icons } from "../Icons";
import "./InputField.css";

interface InputFieldProps {
    type: string;
    name: string;
    id: string;
    placeholder: string;
    label: string;
    icon: JSX.Element;
    handleOnIconClick?: () => void;
    value: string;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    validationError?: string;
}

const InputField = ({
    type,
    name,
    id,
    placeholder,
    label,
    icon,
    value,
    handleOnIconClick,
    handleOnChange,
    validationError,
}: InputFieldProps) => {
    return (
        <>
            <div className='input-container'>
                <div onClick={handleOnIconClick} className='icon'>
                    {icon}
                </div>
                <div className='input'>
                    <label htmlFor={id}>{label}</label>
                    <input
                        id={id}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => handleOnChange(e)}
                        required
                    />
                </div>
                {validationError && (
                    <div className='icon'>
                        {validationError ? <Icons.cross /> : <Icons.check />}
                    </div>
                )}
            </div>
        </>
    );
};

export default InputField;
