import React, { useState } from "react";
import SideMenu from "../Menu/SideMenu";
import styles from './dashboard.module.css';
import { faBook, faChartSimple, faLightbulb, faPaintBrush, faShield, faTableCellsLarge, faTimeline, faToggleOn, faUsers } from "@fortawesome/free-solid-svg-icons";

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
                    <SideMenu ativarSideMenu={ativarSideMenu} items={[{ nome: "Dashboard", link: "/Home/home", icon: faTableCellsLarge },
                    { nome: "Track", link: "/H", icon: faBook }, { nome: "Statistics", link: "/Hoe", icon: faChartSimple },
                    { nome: "Categories", link: "/Ho", icon: faUsers }, { nome: "Expenses", link: "/Ho", icon: faTimeline }
                    ]}
                        profiles={[{ nome: "Insights", link: "/Hod", icon: faLightbulb }, { nome: "Customize", link: "/Hod", icon: faPaintBrush },
                            { nome: "Privacy", link: "/Hod", icon: faShield }
                        ]} />
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