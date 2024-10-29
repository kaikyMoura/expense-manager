import ExpenseModal from "@/utils/ExpenseModal/expenseModal";
import { faBook, faChartSimple, faLightbulb, faPaintBrush, faShield, faTableCellsLarge, faTags, faTimeline } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import SideMenu from "../Menu/SideMenu";
import NavBar from "../Navbar/navbar";
import styles from './dashboard.module.css';

interface DashBoardProps {
    children: React.ReactNode;
}

const DashBoard: React.FC<DashBoardProps> = ({ children }) => {
    const [ativarSideMenu, setSideMenu] = useState(false)

    const [activeModal, setActiveModal] = useState(false)

    const toggleSidebar = () => {
        setSideMenu(!ativarSideMenu);
    }

    const addExpense = () => {
        setActiveModal(true)
    }

    const close = () => {
        setActiveModal(false)
    }



    return (
        <>
            <div>
                <div className={`${styles.dashBoard}`}>
                    <NavBar titulo={"Expense Manager"} openModal={addExpense} />

                    {!ativarSideMenu ?
                        <SideMenu ativarSideMenu={ativarSideMenu} items={[{ nome: "Dashboard", link: "/Home/home", icon: faTableCellsLarge },
                        { nome: "Tracks", link: "/H", icon: faBook }, { nome: "Statistics", link: "/Hoe", icon: faChartSimple },
                        { nome: "Categories", link: "/Ho", icon: faTags }, { nome: "Expenses", link: "/Expense/expenses", icon: faTimeline }
                        ]}
                            profiles={[{ nome: "Insights", link: "/Hod", icon: faLightbulb }, { nome: "Customize", link: "/Hod", icon: faPaintBrush },
                            { nome: "Privacy", link: "/Hod", icon: faShield }
                            ]} />
                        : null}
                </div>

                <div className={styles.children}>

                    <main>
                        {children}
                    </main>
                </div>
            </div>
            {activeModal ? <ExpenseModal Close={close} /> : null}
        </>
    )
}

export default DashBoard