import { createUser } from "@/api/services/userService";
import Button from "@/components/Button/button";
import Form from "@/components/FormCard/form";
import Input from "@/components/Input/input";
import Toolbar from "@/components/ToolBar/toolbar";
import Loading from "@/utils/Loading/loading";
import { faArrowLeft, faArrowRight, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import styles from './signup.module.css';
import Link from "next/link";

const Signup = () => {
    const [alerta, setAlerta] = useState(false)
    const [carregando, setCarregando] = useState(false)

    const [currentPage, setCurrentPage] = useState(0);

    const router = useRouter()

    const [image, setImage] = useState<string | ArrayBuffer | null>()
    const [tempImage, setTempImage] = useState<string>()

    const [name, setName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    const handleFileInput = (event: { target: { files: FileList } }) => {
        if (tempImage) {
            URL.revokeObjectURL(tempImage)
        }
        const file = event.target.files?.[0]
        if (file) {
            const tempFile = new Blob([file], { type: file.type });
            const tempFileUrl = URL.createObjectURL(tempFile);
            setTempImage(tempFileUrl);

            const reader = new FileReader();
            reader.onloadend = () => {
                console.log(reader.result);
                setImage(reader.result);
            };
        }
    }

    const createAccount = async () => {
        console.log(password)
        console.log(repeatPassword)

        if (password != repeatPassword) {
            setAlerta(true)
        }

        const usuario: IUserLogin = {
            name: name,
            lastName: lastname,
            image: image,
            email: email,
            password: password
        }

        console.log(usuario)
        setCarregando(true)
        await createUser(usuario).then(() => {
            setAlerta(true)
            setCarregando(false)
            router.push('/loginPage')
        }).catch((erro) => {
            setCarregando(false)
            console.error("Erro: ", erro)
        })
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        return () => {
            if (tempImage) {
                URL.revokeObjectURL(tempImage);
            }
        };
    }, [tempImage]);

    return (
        <>
            <Toolbar />
            <div className={styles.container}>

                <Form pages={2} currentPage={currentPage} onPageChange={handlePageChange} title={"Create account"}>

                    <div className="mt-2">
                        <div className="flex justify-center">
                            {tempImage ?
                                <Image className="" src={tempImage} alt={"fafs"} width={120} height={120} />
                                :
                                <FontAwesomeIcon className={styles.profileIcon} icon={faUserCircle} fontSize={120} />
                            }
                            <div className={styles.inputFile}>
                                <p className="font-medium ml-3">Profile image</p>
                                <Input type="file" placeholder={""} accept=".png, .jpg, .jpeg" onChange={handleFileInput} />
                            </div>
                        </div>
                        <Input label={"Name"} placeholder={"name"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setEmail(e.target.value)} type={"email"} />
                        <Input label={"Last name"} placeholder={"lastname"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setEmail(e.target.value)} type={"email"} />
                        <div className="flex justify-center">
                            <button onClick={() => handlePageChange(currentPage + 1)}>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>

                        <div className="mt-4 flex justify-center">
                            <p className="font-medium">Already have an account ?</p>
                            <Link className="ml-2" href="/Login/login">
                                <p className="font-medium">click here</p>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button onClick={() => handlePageChange(currentPage - 1)}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <Input label={"Email"} placeholder={"email"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setEmail(e.target.value)} type={"email"} />
                        <Input label={"Repeat email"} placeholder={"email"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setEmail(e.target.value)} type={"email"} />
                        <Input label={"Password"} placeholder={"password"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setPassword(e.target.value)
                        } type={"password"} />
                        <Input label={"Repeat password"} placeholder={"password"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setPassword(e.target.value)
                        } type={"password"} />

                        <div className={`mt-2 flex justify-center ${styles.loginButton}`}>
                            <Button text={"salvar"} width={280} height={40} type={"primary"} action={createAccount} />
                        </div>

                        <div className="mt-4 flex justify-center">
                            <p className="font-medium">Already have an account ?</p>
                            <Link className="ml-2" href="/Login/login">
                                <p className="font-medium">click here</p>
                            </Link>
                        </div>
                    </div>
                </Form>
            </div>

            {carregando ? <Loading /> : null}
        </>
    )
}

export default Signup;