import DashBoard from "@/components/Dashboard/dashboard";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/utils/Loading/loading";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

const PrivateLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
     const { isAuthenticated } = useAuth()
     
    if (isAuthenticated === true) {
        return <DashBoard>{children}</DashBoard>;
    }
};

export default PrivateLayout;