import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './input.module.css'
import { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface InputProps {
    onClick?: Function | any;
    onChange?: Function | any;
    label?: string
    placeholder: string
    type: "text" | "password" | "email"
}

const Input = ({ onClick, onChange, type, label, placeholder }: InputProps) => {
    const [changeIcon, setChangeIcon] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    let icon
    type == "password" ? icon = <FontAwesomeIcon icon={faEye} /> : null

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
                <p>{label}</p>
                <input className={`${styles.input}`} type={type === "password" && showPassword ? "text" : type} onClick={onClick} placeholder={placeholder} onChange={onChange} />
                {type === "password" ?
                    <>
                        {!changeIcon ?
                            <button className='' onClick={handleIconChange}>
                                <i>{icon}</i>
                            </button>
                            :
                            <button className='' onClick={handleIconChange}>
                                <i>{icon = <FontAwesomeIcon icon={faEyeSlash} />}</i>
                            </button>
                        }
                    </>
                    : null}
            </div >
        </>
    )
}

export default Input;