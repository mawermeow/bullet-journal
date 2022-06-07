import Head from "next/head";
import Intro from "../components/intro/Intro";

const IntroPage=()=>{
    return <div className='center'>
        <Head>
            <title>介紹頁面 - 子彈筆記</title>
            <meta name="description" content="什麼是子彈筆記？"/>
        </Head>
        <Intro/>
    </div>
};

export default IntroPage;