import { useRouter } from "next/router";
import { SetStateAction, useState } from "react";
import styles from './login.module.css'
import Input from "@/components/Input/input";
import Link from "next/link";
import Button from "@/components/Button/button";
import Toolbar from "@/components/ToolBar/toolbar";
import { userLogin } from "@/api/services/userService";
import Loading from "@/utils/Loading/loading";

const LoginPage = () => {

    const [alerta, setAlerta] = useState(false)
    const [carregando, setCarregando] = useState(false)

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = async () => {
        setCarregando(true)
        const usuario: IUserLogin = {
            email: email,
            password: password
        }
        sessionStorage.setItem('UserEmail', email)
        console.log(email)

        await userLogin(usuario).then(() => {
            //setAlerta(true)
            setCarregando(false)
            router.push("/Home/home")
        }).catch((erro: any) => {
            setCarregando(false)
            setAlerta(true)
            console.error("Erro: ", erro)
        })
    }
    const Closer = () => {
        setAlerta(false)
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
                        <Button text={"salvar"} width={280} height={25} type={"primary"} action={login} />
                    </div>
                    <br />
                    <div className="flex justify-center">
                        <p className="font-medium">First acess ?</p>
                        <Link className="ml-2" href="/createUserPage">
                            <p className="font-medium">click here</p>
                        </Link>
                    </div>
                </form>
            </div>

            {carregando ? <Loading /> : null}
        </>
    )
}

export default LoginPage;