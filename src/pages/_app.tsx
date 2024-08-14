import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import '../styles/globals.css';
import GetStarted from "./GetStarted/getStarted";
import ComponenteTela from "./pageRender";
// import CreateUserPage from "./createUserPage";
import Cookie from 'js-cookie';


const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter()

    const token = typeof window !== 'undefined' ? Cookie.get('Token') : null;

    useEffect(() => {
        const renderizar = async () => {
            if (!token && router.pathname !== '/Login/login') {
                return <GetStarted />

            }
            else if (token && router.pathname == '/') {
                router.push('/Home/home')
            }
        }
        renderizar()
    }, [token, router]);

    // if (router.pathname === '/createUserPage') {
    //     return <CreateUserPage />
    // }

    return (
        <ComponenteTela>
            <Component {...pageProps} />
        </ComponenteTela>
    );

};

export default App;