import Button from "@/components/Button/button";
import Toolbar from "@/components/ToolBar/toolbar";
import styles from './verifyAccount.module.css';
import Image from 'next/image'
import { SetStateAction, useState } from "react";
import Input from "@/components/Input/input";
import { resendEmail } from "@/api/services/userService";
import { useLoadingContext } from "@/contexts/LoadingContext";


const VerifyAccount = () => {
    const { setLoading } = useLoadingContext()
    const [email, setEmail] = useState('')

    const sendEmail = async () => {
        const response = await resendEmail(email)

        setLoading(true)
        if (response.success === true) {
            setLoading(false)
        }
    }

    return (
        <>
            <Toolbar />
            <div className={`flex justify-center text-center ${styles.container}`}>
                <div className={styles.card}>
                    <div>
                        <h2 className="font-bold text-3xl flex justify-center">Please verify your account</h2>
                        <p className="mt-6 text-lg">An email has been sent to your email. Please check your inbox and click the link to activate your account.</p>
                    </div>
                    <div>
                        <Image className='flex -mt-8 lg:ml-24 sm:ml-0 ' src={'/dc0ff5c5-7d02-4575-8158-fae0fb0ef4d8.png'} alt={'Free'} width={350} height={280} />
                    </div>
                    <div className="-mt-8">
                        <Input placeholder={"email"} type={"text"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setEmail(e.target.value)} value={email} />
                        <Button className="mt-4" type={"primary"} text={"Resend Verication Email"} width={400} height={40} action={sendEmail} />
                    </div>
                </div>
            </div >
        </>
    )
}

export default VerifyAccount;