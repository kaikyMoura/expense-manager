import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GetStarted from "./GetStarted/getStarted";
import LoginPage from "./Login/login";
import DashBoard from "@/components/Dashboard/dashboard";
import Cookie from 'js-cookie';

const ComponenteTela: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuthentication = () => {
            if (typeof window !== 'undefined') {
                const token = Cookie.get('Token');

                if (!token) {
                    setIsAuthenticated(false);
                    if (router.pathname !== '/Login/login' && router.pathname !== '/GetStarted/getStarted') {
                        router.push('/GetStarted/getStarted');
                    }
                } else {
                    setIsAuthenticated(true);
                    if (router.pathname === '/') {
                        router.push('/Home/home');
                    }
                }
            }
        };

        checkAuthentication();
    }, [router]);

    if (isAuthenticated === null) {
        return <div>Carregando...</div>;
    }

    if (!isAuthenticated && router.pathname === '/GetStarted/getStarted') {
        return <GetStarted />;
    }

    if (!isAuthenticated && router.pathname === '/Login/login') {
        return <LoginPage />;
    }

    // Se houver um token, renderize os filhos (componentes aninhados) dentro de uma rota
    return (
        <DashBoard>
            {children}
        </DashBoard>
    )
};

export default ComponenteTela;