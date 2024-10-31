import { Icons } from "../Icons";
import "./InputField.css";

interface InputFieldProps {
    type: string;
    name: string;
    id: string;
    placeholder: string;
    label: string;
    icon: JSX.Element;
}

const InputField = ({
    type,
    name,
    id,
    placeholder,
    label,
    icon,
}: InputFieldProps) => {
    return (
        <div className='input-container'>
            <div className='icon'>{icon}</div>
            <div className='input'>
                <label htmlFor={id}>{label}</label>
                <input
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                />
            </div>
            <div className='icon'>
                <Icons.check />
            </div>
        </div>
    );
};

export default InputField;
