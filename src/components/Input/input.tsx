import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './input.module.css'
import { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface InputProps {
    onClick?: Function | any;
    onChange?: Function | any;
    label?: string;
    value?: string | any;
    placeholder: string;
    type: "text" | "password" | "email" | "number" | "file";
    maxLength?: number;
    accept?: string
}

const Input = ({ onClick, onChange, type, label, placeholder, value, maxLength, accept }: InputProps) => {
    const [changeIcon, setChangeIcon] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    let icon
    type == "password" ? icon = <FontAwesomeIcon icon={faEye} height={20}/> : null

    const handleIconChange = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        if (changeIcon == false) {
            setShowPassword(true)
            setChangeIcon(true)
        }
        else {
            setShowPassword(false)
            setChangeIcon(false)
        }
    }

    return (
        <>
            <div className={`${styles.inputButton}`}>
                <label>{label}</label>
                <input className={`${styles.input}`} type={type === "password" && showPassword ? "text" : type}
                    onClick={onClick} placeholder={placeholder} onChange={onChange} value={value} maxLength={maxLength} accept={accept} />
                {type === "password" && (
                    <>
                        {!changeIcon ?
                            <button className='' onClick={handleIconChange}>
                                <i>{icon}</i>
                            </button>
                            :
                            <button className='' onClick={handleIconChange}>
                                <i>{icon = <FontAwesomeIcon icon={faEyeSlash} height={20}/>}</i>
                            </button>
                        }
                    </>
                )}
            </div >
        </>
    )
}

export default Input;