import Button from "@/components/Button/button"
import Input from "@/components/Input/input"
import Toolbar from "@/components/ToolBar/toolbar"
import { SetStateAction, useState } from "react"

import { checkUserAuthentication, updatePassword } from "@/api/services/userService"
import Alert from "@/utils/Notification/notification"
import styles from './changePassword.module.css'
import { useRouter } from "next/router"

const ChangePassword = () => {

    const [renewToken, setRenewToken] = useState<string | string[] | undefined>("")
    const router = useRouter();
    const { token } = router.query

    const [sucessAlert, setSucessAlert] = useState(false)
    const [errorAlert, setErrorAlert] = useState(false)
    const [text, setText] = useState("")

    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    console.log(token)
    const changePassword = async () => {
        setRenewToken(token)
        if (password != repeatPassword) {
            setErrorAlert(true)
            setText("The passwords do not match")
        }

        const response = await updatePassword(renewToken, password)

        if (response.success === true) {
            setSucessAlert(true)
            setText(response.message)
            router.replace("/Login/login")
        }
        else {
            console.log(response.error)
            if (response.error === "Token inválido ou expirado.") {
                setText("Link inválido ou expirado")
                setErrorAlert(true)
            }
            else if (response.error) {
                setErrorAlert(true)
                setText(response.error)
            }
        }

    }

    const Close = () => {
        setErrorAlert(false)
        setSucessAlert(false)
    }

    return (
        <>
            <Toolbar />
            <div className={styles.container}>

                <form className={styles.formContainer}>
                    <h2 className="font-medium text-xl">Reset Password</h2>
                    <Input label={"New password"} placeholder={"email"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                        setPassword(e.target.value)} type={"password"} />
                    <Input label={"Repeat password"} placeholder={"password"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                        setRepeatPassword(e.target.value)
                    } type={"password"} />
                    <br />
                    <div className={`flex justify-center ${styles.loginButton}`}>
                        <Button text={"Reset password"} width={280} height={32} type={"primary"} action={changePassword} />
                    </div>
                    <br />
                </form>
            </div>

            {errorAlert ? <Alert type={"error"} title={"Error!"} text={text} Close={Close} /> : null}
            {sucessAlert ? <Alert type={"sucess"} title={"Sucess!"} text={text} Close={Close} /> : null}

        </>
    )
}

export default ChangePassword;