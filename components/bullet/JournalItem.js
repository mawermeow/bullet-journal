import classes from "./JournalItem.module.css";

import Trash from "../icon/Trash";
import CheckCircle from "../icon/CheckCircle";
import ClipboardList from "../icon/ClipboardList";
import Hashtag from "../icon/Hashtag";
import ExclamationCircle from "../icon/ExclamationCircle";
import ArrowRight from "../icon/ArrowRight";
import {useEffect, useState} from "react";

const typeToIcon = (type) => {
    if (type === 'event') {
        return ClipboardList;
    }
    if (type === 'notes') {
        return Hashtag;
    }
    if (type === 'task') {
        return ExclamationCircle;
    }
    if (type === 'taskOK'){
        return CheckCircle
    }
};

const JournalItem = (props) => {
    const {data} = props;
    const [iconType,setIconType]=useState(data.type);
    const Icon = typeToIcon(iconType);

    const clickIcon=()=>{
        if(iconType==='task'){
            setIconType('taskOK')
            props.onChangeLog({...data,type:'taskOK'});
        }
        if(iconType==='taskOK'){
            setIconType('task')
            props.onChangeLog({...data,type:'task'});
        }
    }

    const itemClass = `${classes.item} ${iconType==='task'?classes.task:''}`

    return <li className={itemClass}>
          <span className={classes.icon} onClick={clickIcon}>
            <Icon/>
          </span>
          <span>{data.title}</span>
    </li>;
};
export default JournalItem;