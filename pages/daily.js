import {getSession} from "next-auth/client";
import AddLog from "../components/bullet/AddLog";
import JournalList from "../components/bullet/JournalList";
import {useEffect, useState} from "react";
import {useContext} from "react";
import JournalDetailContext from "../store/JournalDetailContext";
import useJournal from "../hooks/useJournal";
import Head from "next/head";
import localDate from "../lib/local-date";
import JournalLog from "../components/bullet/JournalLog";


const DailyLogPage = () => {
    useJournal();

    const [pastDateList ,setPastDateList] = useState([]);
    const [futureDateList ,setFutureDateList] = useState([]);

    const [showFutureLog, setShowFutureLog] = useState(false);
    const [showTaskLog, setShowTaskLog] = useState(false);

    const {logs} = useContext(JournalDetailContext);

    const getJournalDate = (journalItems) => {
        if (!journalItems) {
            return [];
        }
        const allDateList = journalItems.map(item => item.date)

        const dateList = allDateList.filter((item, index, arr) => {
            return arr.indexOf(item) === index;
        }).sort().reverse();

        let futureDateArray = [''];
        const pastDateArray = dateList.filter(dateItem => {
            if (localDate >= dateItem) {
                return dateItem
            } else {
                futureDateArray.push(dateItem);
            }
        })
        setPastDateList(pastDateArray);
        setFutureDateList(futureDateArray);
    };


    useEffect(() => {
        if (logs) {
            getJournalDate(logs);
        }
    }, [logs, showTaskLog]);

    return <>
        <Head>
            <title>日誌 - Daily Logs</title>
            <meta name="description" content="開始撰寫你的子彈筆記吧！點擊任務前面的圖示可以完成任務，點擊筆記的文字部分可以進行修改、指派日期和新增客製化標籤。未指定日期的筆記將標示「很久以後」..."/>
        </Head>
        <div className='center'>
        <AddLog/>
        <div className="colorButton">
            <button onClick={() => setShowFutureLog(prevState => !prevState)}>
                {showFutureLog ? '隱藏' : '顯示'}未來筆記
            </button>
            <button onClick={() => setShowTaskLog(prevState => !prevState)}>
                {showTaskLog ? '所有筆記項目' : '待辦事項清單'}
            </button>
        </div>
        {showFutureLog && <JournalLog dateList={futureDateList} logs={logs} showTaskLog={showTaskLog}/>}
        <JournalLog dateList={pastDateList} logs={logs} showTaskLog={showTaskLog}/>
    </div>
    </>
};

export async function getServerSideProps(context) {
    const session = await getSession({req: context.req});

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {session}
    };
}

export default DailyLogPage;