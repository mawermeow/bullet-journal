import {useContext} from "react";
import Head from "next/head";
import {getSession} from "next-auth/client";
import useJournal from "../hooks/useJournal";
import JournalDetailContext from "../store/JournalDetailContext";
import LogEditor from "../components/editor/LogEditor";
import Intro from "../components/intro/Intro";

const HomePage = () => {
    return <div className='center'>
        <Head>
            <title>介紹頁面 - 子彈筆記</title>
            <meta name="description" content="什麼是子彈筆記？"/>
        </Head>
        <Intro/>
    </div>
};

export default HomePage;