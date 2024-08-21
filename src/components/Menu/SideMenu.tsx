import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faArrowRightFromBracket, faSliders } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cookie from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './sidemenu.module.css'

interface SideMenuProps {
    items: { nome: string, link: string, icon: IconProp }[],
    profiles?: { nome: string, link: string, icon: IconProp }[],
    ativarSideMenu: Boolean,
}

const SideMenu = ({ items, ativarSideMenu, profiles }: SideMenuProps) => {


    const router = useRouter()

    const pageActive: any = items.find(item => router.pathname === item.link)

    const Logout = async () => {
        Cookie.remove('Token')
        router.push('/')
    }

    return (
        <>
            <div className={styles.sideContainer}>
                <div className={`${styles.sidemenu}`}>

                    <div className={`sticky flex justify-center text-2xl font-bold gap-2 ml-6 mt-4 ${styles.sideMenuTitle}`} >
                        <FontAwesomeIcon className='m-1' icon={pageActive?.icon} />
                        <h3>{pageActive?.nome}</h3>
                    </div>

                    <div className={`${styles.side}`}>

                        <ul className={`-mt-20`}>
                            {items?.map((item) => (
                                <>
                                    <li className={`mt-1 ${router.pathname == item.link ? styles.selected : null}`}>
                                        <Link className={`flex justify-start gap-2 ${styles.item}`} href={item.link}>
                                            <i className={`mr-2 mt-1 ${ativarSideMenu ? styles.collapsed : null}`}>
                                                <FontAwesomeIcon className='m-1' icon={item.icon} fontSize={20} />
                                            </i>
                                            {!ativarSideMenu ? <p className='text-lg'>{item.nome}</p> : null}
                                        </Link>
                                    </li>
                                </>
                            ))}
                        </ul>

                        <div className={`mt-2 relative w-[100%] ${styles.line}`} />

                        <ul className={`mt-4`}>
                            <p className='text-lg font-bold'>Profiles</p>
                            {profiles?.map((item) => (
                                <>
                                    <div className={`${styles.profileActions}`}>
                                        <li className={`mt-1 ${router.pathname == item.link ? styles.selected : null}`}>
                                            <Link className={`flex justify-start gap-2 ${styles.item}`} href={item.link}>
                                                <i className={`mr-2 mt-1 ${ativarSideMenu ? styles.collapsed : null}`}>
                                                    <FontAwesomeIcon className='m-1 mt-2' icon={item.icon} fontSize={20} />
                                                </i>
                                                {!ativarSideMenu ? <p className='text-lg'>{item.nome}</p> : null}
                                            </Link>
                                        </li>
                                    </div>
                                </>
                            ))}
                        </ul>
                        <div className={`mt-2 relative w-[100%] ${styles.line}`} />

                        <div className='mt-6 ml-3'>
                            <Link className={`flex justify-start gap-2`} href={'/menu/preferences'}>
                                <i className={`mr-2 ${ativarSideMenu ? styles.collapsed : null}`}>
                                    <FontAwesomeIcon className='mt-2' icon={faSliders} fontSize={20} />
                                </i>
                                {!ativarSideMenu ? <p className='mt-1 text-lg'>Preferences</p> : null}
                            </Link>
                        </div>

                    </div>
                    <div className='-ml-4'>
                        <button className={`absolute bottom-2`} onClick={Logout}>
                            <div className={`flex justify-start gap-4 ${styles.item}`}>
                                <i className='mt-1'>
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} fontSize={20} />
                                </i>
                                {!ativarSideMenu ? <p className='text-lg'>Sign out</p> : null}
                            </div>
                        </button>
                    </div>
                </div>

            </div >
        </>
    )
}

export default SideMenu;