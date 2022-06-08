import {getSession} from "next-auth/client";
import {useContext} from "react";
import JournalDetailContext from "../../store/JournalDetailContext";
import {useRouter} from "next/router";
import useJournal from "../../hooks/useJournal";
import Head from "next/head";
import LogEditor from "../../components/editor/LogEditor";
import LoadingSpinner from "../../components/ui/LoadingSpinner";


const TagDetailPage = () => {
    const {logs} = useContext(JournalDetailContext);
    const router = useRouter();
    const tagName = router.query.tag;
    const showStatus = {pastLog:true,futureLog:true}

    useJournal();

    const head = <Head>
        <title>{tagName} - Customer Tags</title>
        <meta name="description" content="「客製化」區塊，可以自行定義標籤、新增任務。如：親友生日、目標設定、令人開心的事、買買買清單⋯⋯"/>
    </Head>

    if(logs){
        const tagLogFilter = logs.filter(log => {
            if (tagName === log.tag) {
                return log;
            }
        })
        return <>
            {head}
            {logs && <LogEditor logs={tagLogFilter} tagName={tagName} showStatus={showStatus}/>}
        </>
    }

    return <>
        {head}
        {!logs && <div className="center"><LoadingSpinner/></div>}
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