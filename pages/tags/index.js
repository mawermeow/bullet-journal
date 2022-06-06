import TagGrid from "../../components/tag/TagGrid";
import {useContext, useEffect, useState} from "react";
import JournalDetailContext from "../../store/JournalDetailContext";
import useJournal from "../../hooks/useJournal";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Head from "next/head";

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
        <Head>
            <title>自定義標籤 - Customer Tags</title>
            <meta name="description" content="「客製化」區塊，可以自行定義標籤、新增任務。如：親友生日、目標設定、令人開心的事、買買買清單⋯⋯"/>
        </Head>
        {tags && <TagGrid tags={tags}/>}
    </>
};

export default TagsPage;