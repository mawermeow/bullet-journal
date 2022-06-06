import {getSession} from "next-auth/client";
import AddLog from "../components/bullet/AddLog";
import JournalList from "../components/bullet/JournalList";
import {useEffect, useState} from "react";
import {useContext} from "react";
import JournalDetailContext from "../store/JournalDetailContext";
import useJournal from "../hooks/useJournal";

const getDate = () => {
    const d = new Date();
    return d.getFullYear() + '/' + (d.getMonth() + 1).toString().padStart(2, '0') + '/' + d.getDate().toString().padStart(2, '0');
};

const DailyLogPage = () => {
    useJournal();
    const [pastJournal, setPastJournal] = useState();
    const [futureJournal, setFutureJournal] = useState();
    const [showFutureLog, setShowFutureLog] = useState(false);
    const [showTaskLog, setShowTaskLog] = useState(false);

    const d = getDate();

    const {logs} = useContext(JournalDetailContext);


    const getJournal = (dateList) => {
        return dateList.map(date => {
            let oneDateLogs = logs.filter(item => {
                if (date === item.date) {
                    return item
                }
            })
            if (showTaskLog) {
                oneDateLogs = oneDateLogs.filter(log => {
                    if (log.type === 'task') {
                        return log
                    }
                })
            }
            const dateTitle = `${date === d ? 'Today ✩ ' :date===''?'很久以後': ''}${date}`
            return <div key={date}>
                {oneDateLogs.length > 0 &&
                    <JournalList items={oneDateLogs} dateTitle={dateTitle}/>
                }
            </div>
        })
    };

    const getJournalDate = (journalItems) => {
        if (!journalItems) {
            return [];
        }
        const allDateList = journalItems.map(item => item.date)

        const dateList = allDateList.filter((item, index, arr) => {
            return arr.indexOf(item) === index;
        }).sort().reverse();

        let futureDateList = [''];
        const pastDateList = dateList.filter(dateItem => {
            if (d >= dateItem) {
                return dateItem
            } else {
                futureDateList.push(dateItem);
            }
        })
        return [pastDateList, futureDateList]
    };


    useEffect(() => {
        if (logs) {
            const [pastDateList, futureDateList] = getJournalDate(logs);
            setPastJournal(getJournal(pastDateList));
            setFutureJournal(getJournal(futureDateList));
        }
    }, [logs, showTaskLog]);

    return <div className='center'>
        <AddLog/>
        <div className="colorButton">
            <button onClick={() => setShowFutureLog(prevState => !prevState)}>
                {showFutureLog ? '隱藏' : '顯示'}未來筆記
            </button>
            <button onClick={() => setShowTaskLog(prevState => !prevState)}>
                {showTaskLog ? '所有筆記項目' : '待辦事項清單'}
            </button>
        </div>
        {showFutureLog && futureJournal}
        {pastJournal}
    </div>
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