import { createUser } from "@/api/services/userService";
import Button from "@/components/Button/button";
import Form from "@/components/FormCard/form";
import Input from "@/components/Input/input";
import Toolbar from "@/components/ToolBar/toolbar";
import Loading from "@/utils/Loading/loading";
import Alert from "@/utils/Notification/notification";
import { faArrowLeft, faArrowRight, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import styles from './signup.module.css';

const Signup = () => {
    const [sucessAlert, setSucessAlert] = useState(false)
    const [errorAlert, setErrorAlert] = useState(false)
    const [carregando, setCarregando] = useState(false)

    const [text, setText] = useState<string | undefined>('')

    const [currentPage, setCurrentPage] = useState(0);

    const router = useRouter()

    const [image, setImage] = useState<string | ArrayBuffer | null>()
    const [tempImage, setTempImage] = useState<string>()

    const [name, setName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [repeatEmail, setRepeatEmail] = useState("")
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
            reader.readAsDataURL(file);
        }
    }

    const createAccount = async () => {
        console.log(image)
        if (password != repeatPassword) {
            setErrorAlert(true)
            setText("The passwords do not match")
        }

        if (email != repeatEmail) {
            setErrorAlert(true)
            setText("The email fields are different")
        }

        const usuario: IUserLogin = {
            name: name,
            lastName: lastname,
            profileImage: image,
            email: email,
            password: password
        }

        console.log(usuario)
        setCarregando(true)
        const response = await createUser(usuario)
        if (response.success === true) {
            setCarregando(false)
            router.push('/VerifyAccount/verifyAccount')
        }
        else {
            if (response.error == "Já existe um usuário com esse email.") {
                console.log(response.error)
                setText(response.error)
                setErrorAlert(true)
                setCarregando(false)
                // if (errorAlert) {
                // const timeout = setTimeout(() => setErrorAlert(false), 1000)
                // clearTimeout(timeout)
                // // setNoti
                // }
            }
            else {
                console.log(response.error)
                setText(response.error)
                setErrorAlert(true)
                setCarregando(false)
            }
        }
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

    const Close = () => {
        setErrorAlert(false)
        setSucessAlert(false)
    }

    return (
        <>
            <Toolbar />
            <div className={styles.container}>

                <Form pages={2} currentPage={currentPage} onPageChange={handlePageChange} title={"Create account"}>

                    <div className="mt-2">
                        <div className="flex justify-center">
                            {tempImage ?
                                <Image className={styles.profileImage} src={tempImage} alt={"fafs"} width={100} height={100} />
                                :
                                <FontAwesomeIcon className={styles.profileIcon} icon={faUserCircle} height={20} />
                            }
                            <div className={styles.inputFile}>
                                <p className="font-medium ml-3">Profile image</p>
                                <Input type="file" placeholder={""} accept=".png, .jpg, .jpeg" onChange={handleFileInput} />
                            </div>
                        </div>
                        <Input label={"Name"} placeholder={"name"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setName(e.target.value)} type={"text"} value={name} />
                        <Input label={"Last name"} placeholder={"lastname"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setLastName(e.target.value)} type={"text"} value={lastname} />

                        <div className="flex justify-center">
                            <FontAwesomeIcon className="cursor-pointer" icon={faArrowRight} height={20} onClick={() => handlePageChange(currentPage + 1)} />
                        </div>
                        <div className="mt-4 flex justify-center">
                            <p className="font-medium">Already have an account ?</p>
                            <Link className="ml-2" href="/Login/login">
                                <u className="font-medium">click here</u>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button onClick={() => handlePageChange(currentPage - 1)}>
                            <FontAwesomeIcon icon={faArrowLeft} height={20} />
                        </button>
                        <Input label={"Email"} placeholder={"email"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setEmail(e.target.value)} type={"email"} value={email} />
                        <Input label={"Repeat email"} placeholder={"email"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setRepeatEmail(e.target.value)} type={"email"} value={repeatEmail} />
                        <Input label={"Password"} placeholder={"password"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setPassword(e.target.value)
                        } type={"password"} value={password} />
                        <Input label={"Repeat password"} placeholder={"password"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setRepeatPassword(e.target.value)
                        } type={"password"} value={repeatPassword} />

                        <div className={`mt-2 flex justify-center ${styles.loginButton}`}>
                            <Button text={"Create account"} width={280} height={40} type={"primary"} action={createAccount} />
                        </div>

                        <div className="mt-4 flex justify-center">
                            <p className="font-medium">Already have an account ?</p>
                            <Link className="ml-2" href="/Login/login">
                                <u className="font-medium">click here</u>
                            </Link>
                        </div>
                    </div>
                </Form>
            </div>

            {carregando ? <Loading /> : null}
            {errorAlert ? <Alert type={"error"} title={"Error!"} text={text} Close={Close} /> : null}
            {sucessAlert ? <Alert type={"sucess"} title={"Sucess!"} text={text} Close={Close} /> : null}
        </>
    )
}

export default Signup;