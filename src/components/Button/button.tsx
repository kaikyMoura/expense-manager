import { useEffect, useState } from "react";
import styles from "./button.module.css"

interface ButtonProps {
    type: 'primary' | 'secondary';
    width?: number
    height?: number
    text: string;
    className?: string;
    action?: Function | any
}

const Button = ({ text, width, height, action, type, className }: ButtonProps) => {
    const [color, setColor] = useState('')

    const handleClick = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        if (action) {
            action(event)
        }
    }

    useEffect(() => {
        switch (type) {
            case 'primary':
                setColor('black')
                break;
            case 'secondary':
                setColor('white')
        }
    }, [type])

    return (
        <>
            <button className={`${className} ${styles.styledButton}`} style={{ width: width, height: height, backgroundColor: color}} onClick={handleClick}>
                <p className="font-bold" style={{color: type == 'primary' ? 'white' : 'black'}}>{text}</p>
            </button>
        </>
    )
}

export default Button;