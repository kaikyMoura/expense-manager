import { checkUserAuthentication } from "@/api/services/userService";
import Loading from "@/utils/Loading/loading";
import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import Cookie from 'js-cookie';
import React from "react";


interface AppContextProps {
    isAuthenticated: boolean | null;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined)


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null para estado inicial indefinido
    const router = useRouter();

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
                if (router.pathname !== '/Login/login' && router.pathname !== '/Signup/signup') {
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
            {children}
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