import Button from "@/components/Button/button";
import Toolbar from "@/components/ToolBar/toolbar";
import styles from './verifyAccount.module.css';
import Image from 'next/image'
import { SetStateAction, useState } from "react";
import Input from "@/components/Input/input";
import { resendEmail } from "@/api/services/userService";


const VerifyAccount = () => {
    const [email, setEmail] = useState('')

    const sendEmail = async () => {
        await resendEmail(email)
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
                        <Image className='flex -mt-8 lg:ml-20 sm:ml-0 ' src={'/dc0ff5c5-7d02-4575-8158-fae0fb0ef4d8.png'} alt={'Free'} width={350} height={280} />
                    </div>
                    <div className="justify-center -mt-8">
                        <Input placeholder={"email"} type={"text"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setEmail(e.target.value)} value={email} />
                        <Button type={"primary"} text={"Resend Verication Email"} width={400} height={40} action={sendEmail} />
                    </div>
                </div>
            </div >
        </>
    )
}

export default VerifyAccount;