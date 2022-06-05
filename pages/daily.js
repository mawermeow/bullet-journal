import {getSession} from "next-auth/client";
import AddLog from "../components/bullet/AddLog";
import JournalList from "../components/bullet/JournalList";
import {useEffect, useState} from "react";
import {useContext} from "react";
import NotificationContext from "../store/NotificationContext";

const DailyLogPage = () => {
    const notificationCtx = useContext(NotificationContext);
    const [journalItems, setJournalItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pastJournal, setPastJournal] = useState();
    const [futureJournal, setFutureJournal] = useState();
    const [showFutureLog,setShowFutureLog] = useState(false);
    const d = new Date().toISOString().slice(0, 10);

    useEffect(() => {
        if (isLoading) {
            notificationCtx.showNotification({status: 'render', title: '讀取中', message: '正在取得您的筆記'});
            fetch('/api/user/journal').then(res => {
                if (!res.ok) {
                    notificationCtx.showNotification({status: 'error', title: '錯誤', message: '筆記獲取失敗'});
                    return;
                }
                notificationCtx.showNotification({status: 'success', title: '成功', message: '筆記獲取完成'});
                return res.json()
            }).then(data =>
                setJournalItems(data.items)
            );
            setIsLoading(false);
        }
    }, [isLoading])

    const onAddLog = (newLog) => {
        setJournalItems(prevState => [newLog, ...prevState])
    };

    const updateJournal = (updateItems) => {
        notificationCtx.showNotification({status: 'render', title: '更新中', message: '正在更新您的筆記'});
        fetch('/api/user/change-journal', {
            method: 'PATCH',
            body: JSON.stringify(updateItems),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.ok) {
                setJournalItems(updateItems);
                notificationCtx.showNotification({status: 'success', title: '更新成功', message: '筆記修改完成'});
            } else {
                notificationCtx.showNotification({status: 'error', title: '錯誤', message: '筆記修改失敗，請重新嘗試'});
            }
        })
    };

    const onChangeLog = (updateItem) => {
        let updateItems;

        if (updateItem.type === 'DELETE') {
            updateItems = journalItems.filter(item => {
                if (item.id !== updateItem.id) {
                    return item;
                }
            })
        } else {
            updateItems = journalItems.map(item => {
                if (item.id === updateItem.id) {
                    return updateItem
                }
                return item
            })
        }
        updateJournal(updateItems)
    }

    const getJournalDate = (journalItems) => {
        const allDateList = journalItems.map(item => item.date)

        const dateList = allDateList.filter((item, index, arr) => {
            return arr.indexOf(item) === index;
        }).sort().reverse();

        let futureDateList=[];
        const pastDateList = dateList.filter(dateItem=>{
            if(d >= dateItem){
                return dateItem
            }else{
                futureDateList.push(dateItem);
            }
        })
        return [pastDateList,futureDateList]
    };

    const getJournal=(dateList)=>{
        return dateList.map(date => {
            const oneDateLog = journalItems.filter(item => {
                if (date === item.date) {
                    return item
                }
            })

            const dateTitle = `${date===d ?'Today ✩ ':''}${date}`
            return <div key={date}>
                <JournalList items={oneDateLog} onChangeLog={onChangeLog} dateTitle={dateTitle}/>
            </div>
        })
    };


    useEffect(() => {
        const [pastDateList,futureDateList] = getJournalDate(journalItems);
        setPastJournal(getJournal(pastDateList));
        setFutureJournal(getJournal(futureDateList));
    }, [journalItems]);

    return <div className='center'>
        <AddLog onAddLog={onAddLog}/>
        <div className="colorButton">
        <button onClick={()=>setShowFutureLog(prevState => !prevState)}>
            {showFutureLog?'隱藏':'顯示'}未來筆記
        </button>
        </div>
        {showFutureLog && futureJournal}
        {pastJournal}
        {/*<JournalList items={journalItems}/>*/}
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