import '../styles/globals.css'
import Head from "next/head";
import {NotificationContextProvider} from "../store/NotificationContext";
import {JournalContextProvider} from "../store/JournalDetailContext";
import {LanguageContextProvider} from "../store/LanguageContext";
import Layout from "../components/layout/Layout";

function MyApp({Component, pageProps}) {
    return <LanguageContextProvider>
    <JournalContextProvider>
            <NotificationContextProvider>
                <Layout>
                    <Head>
                        <meta name="viewport" content='width=device-width, initial-scale=1'/>
                        <link rel="shortcut icon" href="/Mawer.svg"/>
                    </Head>
                    <Component {...pageProps} />
                </Layout>
            </NotificationContextProvider>
        </JournalContextProvider>
    </LanguageContextProvider>

}

export default MyApp
