import DashBoard from "@/components/Dashboard/dashboard";
import { useAuth } from "@/contexts/AppContext";
import Loading from "@/utils/Loading/loading";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

const PrivateLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // const router = useRouter()
     const { isAuthenticated } = useAuth()
    // const token = Cookie.get('Token')

    // useEffect(() => {
    //     const handleRedirect = async () => {
    //         console.log('isAuthenticated:', isAuthenticated);
    //         console.log('token:', token);
    //         console.log('pathname:', router.pathname);

    //         if (isAuthenticated === null || token === undefined) {
    //             console.log('Authentication state or token is not yet available.');
    //             return;
    //         }

    //         if (!isAuthenticated || !token) {
    //             console.log('Redirecting to GetStarted.');
    //             router.push('/GetStarted/getStarted');
    //         } else if (router.pathname === '/' && isAuthenticated) {
    //             console.log('Redirecting to Home.');
    //             router.push('/Home/home');
    //         }
    //     };

    //     handleRedirect();
    // }, [isAuthenticated, router, token]);

    // if (isAuthenticated === null) {
    //     return <Loading />;
    // }

    // Renderizar o DashBoard somente se o usuário estiver autenticado
    if (isAuthenticated === true) {
        return <DashBoard>{children}</DashBoard>;
    }
};

export default PrivateLayout;