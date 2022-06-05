import {getSession} from "next-auth/client";
import AddLog from "../components/bullet/AddLog";
import JournalList from "../components/bullet/JournalList";
import {useEffect, useState} from "react";

const DailyLogPage = () => {
    const [journalItems, setJournalItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            fetch('/api/user/journal').then(res => res.json()).then(data =>
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