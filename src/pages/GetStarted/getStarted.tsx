import Image from 'next/image'
import styles from './getStarted.module.css'
import Button from '@/components/Button/button'
import { useRouter } from 'next/router'


const GetStarted = () => {
    const router = useRouter()

    return (
        <>
            <div className={styles.container}>
                <div className='flex sm:ml-2 md:ml-20 lg:ml-28'>
                    <a href="license: Designed by vectorjuice / Freepik">
                        <Image className='mt-10' src={'/20943670.jpg'} alt={'Free'} width={350} height={280} />
                    </a>
                    <div className='mt-16 ml-24'>
                        <h2 className='text-5xl font-bold'>Expense Manager</h2>
                        <div className={`w-[100%] ${styles.line}`} />

                        <div className='m-8'>
                            <h3 className='text-lg font-medium ml-14'>Track expenses with ease</h3>
                        </div>

                        <div className={`relative w-[100%] ${styles.line}`} />

                        <div className='mt-10'>
                            <div className='relative flex justify-center'>
                                <Button text={'Get Started'} type={'primary'} width={280} height={30} />
                            </div>

                            <div className='mt-5 relative flex justify-center'>
                                <Button text={'Acess acount'} type={'primary'} width={280} height={30} action={() => router.push('/Login/login')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetStarted