import {useContext} from "react";
import {useRouter} from "next/router";
import JournalDetailContext from "../../store/JournalDetailContext";
import JournalList from "../../components/bullet/JournalList";
import useJournal from "../../hooks/useJournal";
import AddLog from "../../components/bullet/AddLog";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import {getSession} from "next-auth/client";
import Head from "next/head";
import TagHead from "../../components/bullet/TagHead";


const TagDetailPage = (props) => {
    useJournal();
    const router = useRouter();
    const tagName = router.query.tag;

    const {logs} = useContext(JournalDetailContext);

    if (!logs) {
        return <div className="center"><LoadingSpinner/></div>
    }

    const tagLogFilter = logs.filter(log => {
        if (tagName === log.tag) {
            return log;
        }
    })

    return <>
        <Head>
            <title>{tagName}  - Customer Tags</title>
            <meta name="description" content="「客製化」區塊，可以自行定義標籤、新增任務。如：親友生日、目標設定、令人開心的事、買買買清單⋯⋯"/>
        </Head>
        <TagHead tagName={tagName}/>
        <AddLog tagName={tagName}/>
        <JournalList items={tagLogFilter} dateTitle={`★ ${tagName}`}/>
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

export default TagDetailPage;