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


    return <div className='center'>
        <AddLog onAddLog={onAddLog}/>
        <JournalList items={journalItems}/>
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