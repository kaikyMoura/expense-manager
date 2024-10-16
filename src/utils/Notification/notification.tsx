import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./notification.module.css";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

interface AlertProps {
    type: "error" | "sucess" | "notification",
    Close?: Function | any,
    title: string,
    image?: string
    text: string | undefined
    action?: () => void 
}

const Alert = ({ Close, title, type, text, action }: AlertProps) => {
    
    let color
    switch (type) {
        case "error":
            color = "red"
            break;
        case "sucess":
            color = "#2fc52d"
            break;
        case "notification":
            color = "lightblue"
    }

    useEffect(()=> {

    },[color])

    return (
        <>
            <div className={`${styles.modalBlur}`} style={{borderColor: color}} onClick={(e) => e.stopPropagation()}>
                <button onClick={Close}><FontAwesomeIcon icon={faX} color={"black"} height={20}/></button>
                <div>
                    <h2 className="text-lg" style={{color: color}}>{title}</h2>

                    <p className="">{text}</p>
                
                    <button onClick={action}/>
                </div>
            </div>
        </>
    )
}

export default Alert;