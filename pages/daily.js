import {useContext} from "react";
import Head from "next/head";
import {getSession} from "next-auth/client";
import useJournal from "../hooks/useJournal";
import JournalDetailContext from "../store/JournalDetailContext";
import LogEditor from "../components/editor/LogEditor";

const DailyLogPage = () => {
    const {logs} = useContext(JournalDetailContext);
    const showStatus = {pastLog:false,futureLog:false}

    useJournal();

    return <>
        <Head>
            <title>日誌 - Daily Logs</title>
            <meta name="description"
                  content="開始撰寫你的子彈筆記吧！點擊任務前面的圖示可以完成任務，點擊筆記的文字部分可以進行修改、指派日期和新增客製化標籤。未指定日期的筆記將標示「很久以後」..."/>
        </Head>
        <LogEditor logs={logs} showStatus={showStatus}/>
    </>
};

export async function getServerSideProps(context) {
    const session = await getSession({req: context.req});
    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }
    return {
        props: {session}
    };
}

export default DailyLogPage;