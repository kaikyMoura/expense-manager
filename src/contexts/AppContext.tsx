import { checkUserAuthentication } from "@/api/services/userService";
import Loading from "@/utils/Loading/loading";
import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import Cookie from 'js-cookie';
import React from "react";
import PrivateLayout from "@/pages/privateLayout";
import PublicLayout from "@/pages/publicLayout";


interface AppContextProps {
    isAuthenticated: boolean | null;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

const publicPages = ['/Login/login', '/Signup/signup', '/GetStarted/getStarted', '/VerifyAccount/verifyAccount', '/VerifyAccount/accountVerify']

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    const isPublicPage = publicPages.includes(router.pathname);

    const Layout = isPublicPage ? PublicLayout : PrivateLayout;

    const [loading, setLoading] = useState<boolean | null>(null);

    useEffect(() => {
        const handleAuthentication = async () => {
            const token = Cookie.get('Token');
            setLoading(true);

            if (token) {
                const userAuthenticated = await checkUserAuthentication();
                console.log(userAuthenticated)
                if (userAuthenticated?.error === 'Token inválido ou expirado.') {
                    setIsAuthenticated(false);
                    router.replace('/GetStarted/getStarted');
                } else {
                    setIsAuthenticated(true);
                    if (router.pathname === '/') {
                        router.replace('/Home/home');
                    }
                }
            } else {
                setIsAuthenticated(false);
                if (router.pathname !== '/Login/login' && router.pathname !== '/Signup/signup' && router.pathname !== '/VerifyAccount/verifyAccount' && router.pathname !== '/VerifyAccount/accountVerify') {
                    router.replace('/GetStarted/getStarted');
                }
            }

            setLoading(false);
        };

        handleAuthentication();
    }, [router.pathname]);

    if (loading) {
        return <Loading />;
    }
    if (isAuthenticated == null) {
        return <Loading />;
    }

    return (
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <Layout>
                {children}
            </Layout>
        </AppContext.Provider>
    );
}

export const useAuth = () => {
    const context = React.useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};