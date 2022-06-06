import TagGrid from "../../components/tag/TagGrid";
import {useContext, useEffect, useState} from "react";
import JournalDetailContext from "../../store/JournalDetailContext";
import useJournal from "../../hooks/useJournal";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const TagsPage = () => {
    useJournal();
    const {logs} = useContext(JournalDetailContext);
    const [tags,setTags]=useState([]);

    const getTags=()=>{
        const allTagList = logs.map(item => item.tag);
        return allTagList.filter((tag, index, arr) => {
            if(tag && tag.length>0){
                return arr.indexOf(tag) === index;
            }
        }).sort();
    };

    useEffect(()=>{
        if(logs){
            setTags(getTags());
        }
    },[logs])

    if (!logs){
        return <div className="center"><LoadingSpinner/></div>
    }


    return <>
        {tags && <TagGrid tags={tags}/>}
    </>
};

export default TagsPage;