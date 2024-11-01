import Image from 'next/image'
import { verifyAccount } from "@/api/services/userService";
import Toolbar from "@/components/ToolBar/toolbar"
import Loading from "@/utils/Loading/loading";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from './accountVerify.module.css'
import Button from "@/components/Button/button";
import { useLoadingContext } from '@/contexts/LoadingContext';


const AccountVerify = () => {
    const { isLoading, setLoading } = useLoadingContext()

    const router = useRouter();
    const token = router.query.token

    useEffect(() => {
        const verify = async () => {
            console.log(token)
            setLoading(true)
            const response = await verifyAccount(token)
            if (response.success === true) {
                setLoading(false)
            }
        }
        verify()
    }, [token])

    const goToLogin = () => {
        router.push('/Login/login')
    }

    if (isLoading == true) {
        return <Loading />
    }

    return (
        <>
            <Toolbar />
            <div className={`flex justify-center text-center ${styles.container}`}>
                <div className={styles.card}>
                    <div>
                        <h2 className="font-bold text-3xl flex justify-center">Account Verified Sucessfully!</h2>
                        <p className="mt-6 text-lg">Congratulations! Your account has been verified. You can now start making and managing your expenses history.</p>
                    </div>
                    <div>
                        <Image className='mt-3 lg:ml-28 sm:ml-0 ' src={'/joy.png'} alt={'Free'} width={300} height={220} />
                    </div>
                    <div className="flex justify-center mt-8">
                        <Button type={"primary"} text={"Go to login"} width={400} height={40} action={goToLogin} />
                    </div>
                </div>
            </div >
        </>
    )
}

export default AccountVerify;