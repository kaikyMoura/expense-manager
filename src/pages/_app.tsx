import { AuthProvider, useAuth } from "@/contexts/AppContext";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import '../styles/globals.css';
import PrivateLayout from "./privateLayout";
import PublicLayout from "./publicLayout";
import Loading from "@/utils/Loading/loading";
import Head from "next/head";

const publicPages = ['/Login/login', '/Signup/signup', '/GetStarted/getStarted']

const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();

    const isPublicPage = publicPages.includes(router.pathname);

    const Layout = isPublicPage ? PublicLayout : PrivateLayout;

    return (
        <AuthProvider>
            <Head><link rel='icon' href='/logo.svg' /></Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthProvider>
    );
};

export default App;