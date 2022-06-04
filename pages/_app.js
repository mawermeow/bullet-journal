import '../styles/globals.css'
import Head from "next/head";
import {NotificationContextProvider} from "../store/NotificationContext";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }) {
  return <NotificationContextProvider>
    <Layout>
      <Head>
        <meta name="viewport" content='width=device-width, initial-scale=1'/>
        <link rel="shortcut icon" href="/Mawer.svg"/>
      </Head>
      <Component {...pageProps} />
    </Layout>
  </NotificationContextProvider>

}

export default MyApp
