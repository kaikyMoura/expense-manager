import { AuthProvider } from "@/contexts/AuthContext";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import '../styles/globals.css';
import { LoadingProvider } from "@/contexts/LoadingContext";

const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();



    return (
        <LoadingProvider>
            <AuthProvider>
                <Head>
                    <link rel='icon' href='/logo.svg' />
                    <title>Expense Manager</title>
                </Head>
                <Component {...pageProps} />
            </AuthProvider>
        </LoadingProvider>
    );
};

export default App;