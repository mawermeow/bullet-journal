import {getSession} from "next-auth/client";
import AddLog from "../components/bullet/AddLog";
import JournalList from "../components/bullet/JournalList";
import {useEffect, useState} from "react";
import {useContext} from "react";
import NotificationContext from "../store/NotificationContext";

const DailyLogPage = () => {
    const [journalItems, setJournalItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const notificationCtx = useContext(NotificationContext);
    const [allJournal,setAllJournal] = useState(<></>);

    useEffect(() => {
        if (isLoading) {
            notificationCtx.showNotification({status:'render',title:'讀取中',message:'正在取得您的筆記'});
            fetch('/api/user/journal').then(res => {
                if (!res.ok){
                    notificationCtx.showNotification({status:'error',title:'錯誤',message:'筆記獲取失敗'});
                    return;
                }
                notificationCtx.showNotification({status:'success',title:'成功',message:'筆記獲取完成'});
                return res.json()
            }).then(data =>
                setJournalItems(data.items)
            );
            setIsLoading(false);
        }
    }, [isLoading])

    const onAddLog=(newLog)=>{
        setJournalItems(prevState => [newLog,...prevState])
    };

    const todayItems = journalItems.filter(item=>{
        const d = new Date().toLocaleDateString();
        if(d===new Date(item.id).toLocaleDateString()){
            return item;
        }
    })

    const getAllJournal=(journalItems)=>{
        const allDateList = journalItems.map(item=>item.date);

        const dateList = allDateList.filter((item, index, arr)=>{
            return arr.indexOf(item) === index;
        })

        return dateList.map(date=>{
            const oneDateLog = journalItems.filter(item=>{
                if(date===item.date){
                    return item
                }
            })
            return <div key={date}>
                <h1>{date}</h1>
                <JournalList items={oneDateLog}/>
            </div>
        })
    };

    useEffect(()=>{
        setAllJournal(getAllJournal(journalItems));
    },[journalItems]);


    return <div className='center'>
        <AddLog onAddLog={onAddLog}/>
        {allJournal}
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