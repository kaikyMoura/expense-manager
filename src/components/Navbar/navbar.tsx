import { getUser } from "@/api/services/userService"
import SearchInput from "@/utils/SearchInput/searchInput"
import { faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Button from "../Button/button"
import styles from './navbar.module.css'

interface NavBarProps {
    profile?: () => void,
    openModal?: () => void,
    titulo: string
    activeModal?: boolean
}

const NavBar = ({ titulo, openModal }: NavBarProps) => {
    const router = useRouter()

    const [perfil, setPerfil] = useState<IUser>()

    useEffect(() => {
        const setUser = async () => {
            const user = await getUser()
            console.log(user)
            setPerfil(user)
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
                    <div className="">
                        <SearchInput />
                    </div>
                    <div className="flex items-center mr-2 gap-6">
                        <Button className={`p-2 ${styles.profile}`} type={"secondary"} text={"Add expense"} action={openModal} />
                        <button className="flex items-center">
                            <FontAwesomeIcon icon={faBell} height={20} />
                        </button>
                        <div className={`flex items-center gap-2 p-1 w-42 ${styles.profile}`}>
                            <i className="flex items-center">
                                <FontAwesomeIcon className={styles.profileIcon} icon={faUserCircle} size='2x' color="grey"/>
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