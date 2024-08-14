import { useRouter } from "next/router"
import styles from './navbar.module.css'
import SearchInput from "@/utils/SearchInput/searchInput"
import { getUser } from "@/api/services/userService"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons"

interface NavBarProps {
    navegacao?: { nome: string, link: string }[]
    sidebarActive?: Boolean
    profile?: () => void,
    titulo: string
}

const NavBar = ({ titulo, navegacao, sidebarActive }: NavBarProps) => {
    //const router = useRouter()

    const [perfil, setPerfil] = useState<IUser>()

    useEffect(() => {
        const setUser = async () => {
            const email = typeof window !== 'undefined' ? sessionStorage.getItem('UserEmail') : null;
            console.log(email)
            const user = await getUser(email)
            setPerfil(user)
        }
        setUser()
    }, [])

    return (<>
        <div className={`flex ${styles.navbar}`}>
            <div className="flex items-center justify-between w-[100%]">
                <div className="flex justify-start ml-2">
                    <h3 className="font-medium text-lg">{titulo}</h3>
                </div>
                <div className="">
                    <SearchInput />
                </div>
                <div className="flex items-center mr-2 gap-6">
                    <button className={`p-2 ${styles.profile}`}>
                        <p className="font-bold">Add expense</p>
                    </button>
                    <button className="flex items-center">
                        <FontAwesomeIcon icon={faBell} fontSize={20} />
                    </button>
                    <div className={`flex items-center gap-2 p-1 w-42 ${styles.profile}`}>
                        <i className="flex items-center">
                            <FontAwesomeIcon icon={faUser} fontSize={16} />
                        </i>
                        <div className="">
                            <p>{perfil?.name}</p>
                            <p className="text-sm font-light border-b-2 border-black">{perfil?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default NavBar