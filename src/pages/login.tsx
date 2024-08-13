// import { SetStateAction, useState } from "react";
// import { userLogin } from "../api/services/serviceUser";
// import Button from "../components/Button/Button";
// import Input from "../components/Input/Input";
// import styles from "../styles/loginpage.module.css";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import Loading from '../utils/loading'
// import Alert from "@/utils/notificacao";

// const LoginPage = () => {

//     const [alerta, setAlerta] = useState(false)
//     const [carregando, setCarregando] = useState(false)

//     const router = useRouter()

//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")

//     const login = async () => {
//         const usuario: IUserLogin = {
//             email: email,
//             password: password
//         }
//         sessionStorage.setItem('UserEmail', email)
//         setCarregando(true)

//         await userLogin(usuario).then(() => {
//             //setAlerta(true)
//             setCarregando(false)
//             router.push("/home")
//         }).catch((erro: any) => {
//             setCarregando(false)
//             setAlerta(true)
//             console.error("Erro: ", erro)
//         })
//     }
//     const Closer = () => {
//         setAlerta(false)
//     }

//     return (
//         <>
//             <div className={styles.container}>
//                 <form className={styles.formContainer}>
//                     <h2>Login</h2>
//                     <Input label={"Email"} placeholder={"email"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
//                         setEmail(e.target.value)} type={"email"} />
//                     <Input label={"Senha"} placeholder={"senha"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
//                         setPassword(e.target.value)
//                     } type={"password"} />
//                     <br />
//                     <div className={`flex justify-center ${styles.loginButton}`}>
//                         <Button text={"salvar"} size={16} action={login} />
//                     </div>
//                     <br />
//                     <div>
//                         Não tem uma conta ? <Link href="/createUserPage">clique aqui</Link>
//                     </div>
//                 </form>
//             </div>
//             {carregando ? <Loading /> : null}
//             {alerta ? <Alert type={"error"} title={"Erro!"} Close={Closer} text={"Esse email já esta sendo utlizado!"} /> : null}
//         </>
//     )
// }

// export default LoginPage;