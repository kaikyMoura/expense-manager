import { useEffect, useState } from "react";
import styles from "./button.module.css"

interface ButtonProps {
    type: 'primary' | 'secondary';
    width?: number
    height?: number
    text: string;
    action?: Function | any
}

const Button = ({ text, width, height, action, type }: ButtonProps) => {
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
            <button className={`font-medium ${styles.styledButton}`} style={{ width: width, height: height, backgroundColor: color, color: type == 'primary' ? 'white' : 'black'}} onClick={handleClick}>
                <p>{text}</p>
            </button>
        </>
    )
}

export default Button;