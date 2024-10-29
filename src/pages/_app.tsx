import { AuthProvider } from "@/contexts/AuthContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { AppProps } from "next/app";
import Head from "next/head";
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
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