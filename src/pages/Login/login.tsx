import { sendResetPasswordEmail, userLogin } from "@/api/services/userService";
import Button from "@/components/Button/button";
import Input from "@/components/Input/input";
import Modal from "@/components/Modal/modal";
import Toolbar from "@/components/ToolBar/toolbar";
import { useLoadingContext } from "@/contexts/LoadingContext";
import Alert from "@/utils/Notification/notification";
import { useRouter } from "next/router";
import { SetStateAction, useState } from "react";
import styles from './login.module.css';
import Link from "next/link";

const LoginPage = () => {

    const [errorAlert, setErrorAlert] = useState(false)
    const [notificationAlert, setNotificationAlert] = useState(false)
    const { setLoading } = useLoadingContext()
    const [isOpen, setOpenModal] = useState(false)

    const router = useRouter()

    const [text, setText] = useState("")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = async () => {
        setLoading(true)
        const usuario: IUserLogin = {
            email: email,
            password: password
        }

        const response = await userLogin(usuario)
        if (response.success === true) {
            setLoading(false)
            router.push("/Home/home")
        }
        else {
            setLoading(false)
            console.error("Erro: ", response.error)
            if (response.error) {
                setErrorAlert(true)
                setText(response.error)

                if (response.error === "Sua conta ainda não foi ativada, por favor cheque seu email") {
                    router.push('/VerifyAccount/verifyAccount')
                }
            }
        }
    }
    const Close = () => {
        setErrorAlert(false)
        setNotificationAlert(false)
        setOpenModal(false)
    }

    const resetPassword = async () => {
        setLoading(true)
        const response = await sendResetPasswordEmail(email)
        setOpenModal(false)
        if (response.success === true) {
            setLoading(false)
            setText("An email has been sent to your address. Please check your inbox to proceed with resetting your password.")
            setNotificationAlert(true)
        }
        else {
            if (response.error) {
                setLoading(false)
                setText(response.error)
                setErrorAlert(true)
            }
            else {
                setErrorAlert(true)
                setText("Email incorreto")
            }
        }
    }
    return (
        <>
            <Toolbar />
            <div className={styles.container}>

                <form className={styles.formContainer}>
                    <h2 className="font-medium text-xl">Login</h2>
                    <Input label={"Email"} placeholder={"email"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                        setEmail(e.target.value)} type={"email"} />
                    <Input label={"Password"} placeholder={"password"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                        setPassword(e.target.value)
                    } type={"password"} />
                    <br />
                    <div className={`flex justify-center ${styles.loginButton}`}>
                        <Button text={"Login"} width={280} height={25} type={"primary"} action={login} />
                    </div>
                    <br />
                    <div className="flex justify-center">
                        <p className="font-medium">Forgot your password ?</p>
                        <u className="font-medium ml-2 cursor-pointer" onClick={() => setOpenModal(true)}>click here</u>
                    </div>
                    <div className="flex justify-center mt-4">
                        <p className="font-medium">First acess ?</p>
                        <Link className="ml-2" href={"/Signup/signup"}>
                            <u className="font-medium cursor-pointer ml-2">click here</u>
                        </Link>
                    </div>
                </form>
            </div>

            {errorAlert ? <Alert type={"error"} title={"Error!"} text={text} Close={Close} /> : null}
            {notificationAlert ? <Alert type={"notification"} title={"Message"} text={text} Close={Close} /> : null}

            {isOpen && <Modal classname={styles.modal} Close={Close}>
                <form className={`mt-8`}>
                    <h2 className="font-medium text-xl">Forgot your password ?</h2>
                    <div className="mt-4">
                        <p className="font-medium text-md">Please enter the email address associated with your account</p>
                        <p className="font-medium text-md">and we will send you instructions to reset your password.</p>
                    </div>
                    <div className="mt-4">
                        <Input label={"Email"} placeholder={"email"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setEmail(e.target.value)} type={"email"} />
                    </div>
                    <br />
                    <div className={`flex justify-center ${styles.loginButton}`}>
                        <Button text={"Send email"} width={280} height={40} type={"primary"} action={resetPassword} />
                    </div>
                </form>
            </Modal>}
        </>
    )
}

export default LoginPage;