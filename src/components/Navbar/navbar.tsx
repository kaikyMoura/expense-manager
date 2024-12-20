import { getUser } from "@/api/services/userService"
import SearchInput from "@/utils/SearchInput/searchInput"
import { faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Button from "../Button/button"
import styles from './navbar.module.css'
import Image from "next/image"

interface NavBarProps {
    profile?: () => void,
    openModal?: () => void,
    titulo: string
    activeModal?: boolean
}

const NavBar = ({ titulo, openModal }: NavBarProps) => {
    const router = useRouter()

    const [perfil, setPerfil] = useState<IUser>()
    const [profileImage, setProfileImage] = useState<String | ArrayBuffer | unknown>()

    useEffect(() => {
        const setUser = async () => {
            const user = await getUser()
            console.log(user.data)
            setPerfil(user.data)

            console.log('Image URL:', user.data?.image);
            if (!user.data?.image) {
                console.error("URL da imagem não foi fornecida.");
                return;
            }
        }
        setUser()
    }, [])

    return (
        <>
            <div className={`flex ${styles.navbar}`}>
                <div className="flex items-center justify-between w-[100%]">
                    <div className="flex justify-start ml-2">
                        <h3 className="font-medium text-lg">{titulo}</h3>
                    </div>
                    <div className="flex items-center mr-2 gap-6">
                        <Button className={`p-2 ${styles.profile}`} type={"secondary"} text={"Add expense"} action={openModal} />
                        <button className="flex items-center">
                            <FontAwesomeIcon icon={faBell} height={20} />
                        </button>
                        <div className={`flex items-center gap-2 p-1 w-42 ${styles.profile}`}>
                            <i className="flex items-center">
                                {perfil?.image ?
                                    <Image className={styles.profileIcon} src={`data:image/jpeg;base64,${perfil?.image}`} alt={"fafs"} width={32} height={32} />
                                    :
                                    <FontAwesomeIcon className={styles.profileIcon} icon={faUserCircle} height={20} color="grey" />
                                }
                            </i>
                            <div className="">
                                <p>{perfil?.name} {perfil?.lastName}</p>
                                <p className="text-sm font-light border-b-2 border-black">{perfil?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar