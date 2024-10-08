import { checkUserAuthentication } from "@/api/services/userService";
import PrivateLayout from "@/pages/privateLayout";
import PublicLayout from "@/pages/publicLayout";
import Cookie from 'js-cookie';
import { useRouter } from "next/router";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useLoadingContext } from "../LoadingContext";


interface AuthContextProps {
    isAuthenticated: boolean | null;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const AppContext = createContext<AuthContextProps | undefined>(undefined)

const publicPages = ['/Login/login', '/Signup/signup', '/GetStarted/getStarted', '/VerifyAccount/verifyAccount', '/VerifyAccount/accountVerify']

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    const isPublicPage = publicPages.includes(router.pathname);

    const Layout = isPublicPage ? PublicLayout : PrivateLayout;

    const { setLoading } = useLoadingContext()

    useEffect(() => {
        const timer = setTimeout(() => {
            if (setLoading) {
                const handleRouteChange = () => {
                    setLoading(true);
                };

                const handleRouteComplete = () => {
                    setLoading(false);
                };

                router.events.on('routeChangeStart', handleRouteChange);
                router.events.on('routeChangeComplete', handleRouteComplete);
                router.events.on('routeChangeError', handleRouteComplete);

                return () => {
                    router.events.off('routeChangeStart', handleRouteChange);
                    router.events.off('routeChangeComplete', handleRouteComplete);
                    router.events.off('routeChangeError', handleRouteComplete);
                };
            }
        }, 0);

        return () => clearTimeout(timer);
    }, [router, router.events, setLoading]);


    useEffect(() => {
        const handleAuthentication = async () => {

            try {
                const token = Cookie.get('Token');
                if (token) {
                    const userAuthenticated = await checkUserAuthentication();
                    console.log(userAuthenticated)
                    if (userAuthenticated?.error === 'Token inválido ou expirado.') {
                        setIsAuthenticated(false);
                        Cookie.remove('Token')
                        router.replace('/GetStarted/getStarted');
                    } else {
                        setIsAuthenticated(true);
                        router.replace('/Home/home');
                    }
                } else {
                    setIsAuthenticated(false);
                    if (router.pathname !== '/Login/login' && router.pathname !== '/Signup/signup' && router.pathname !== '/VerifyAccount/verifyAccount' && router.pathname !== '/VerifyAccount/accountVerify') {
                        router.replace('/GetStarted/getStarted');
                    }
                }
            }
            catch (error) {
                console.error("Erro na autenticação:", error);
                setIsAuthenticated(false);
                router.replace('/GetStarted/getStarted');
            }
        };

        handleAuthentication();
    }, [router.pathname]);

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