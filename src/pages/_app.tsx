import { AuthProvider } from "@/contexts/AppContext";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();



    return (
        <AuthProvider>
            <Head>
                <link rel='icon' href='/logo.svg' />
                <title>Expense Manager</title>
            </Head>
            <Component {...pageProps} />
        </AuthProvider>
    );
};

export default App;