import {useContext} from "react";
import {useRouter} from "next/router";
import JournalDetailContext from "../../store/JournalDetailContext";
import JournalList from "../../components/bullet/JournalList";
import useJournal from "../../hooks/useJournal";
import addLog from "../../components/bullet/AddLog";
import LoadingSpinner from "../../components/ui/LoadingSpinner";


const TagDetailPage=()=>{
    useJournal();
    const router = useRouter();
    const tagName = router.query.tag;

    const {logs} = useContext(JournalDetailContext);

    if (!logs){
        return <div className="center"><LoadingSpinner/></div>
    }

    const tagLogFilter = logs.filter(log=>{
        if(tagName===log.tag){
            return log;
        }
    })

    return <>
        {/*<addLog/>*/}
        <JournalList items={tagLogFilter} dateTitle={`★ ${tagName}`}/>
    </>




};

export default TagDetailPage;