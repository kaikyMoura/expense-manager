import React, { useState } from "react";
import SideMenu from "../Menu/SideMenu";
import styles from './dashboard.module.css';

interface DashBoardProps {
    children: React.ReactNode;
}

const DashBoard: React.FC<DashBoardProps> = ({ children }) => {
    const [ativarSideMenu, setSideMenu] = useState(false)

    const toggleSidebar = () => {
        setSideMenu(!ativarSideMenu);
    };

    return (
        <>
            <div className={`${styles.dashBoard}`}>
                {/* <NavBar toggleSideBar={toggleSidebar} navegacao={[
                    { nome: "Home", link: "/home" }
                ]} titulo={"Dashboard"} /> */}


                {!ativarSideMenu ?
                    <SideMenu ativarSideMenu={ativarSideMenu} />
                    : null}
            </div>

            <div className={styles.container}>

                <main>
                    {children}
                </main>

            </div>
        </>
    )
}

export default DashBoard