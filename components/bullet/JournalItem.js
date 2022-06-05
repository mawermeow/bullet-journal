import {useEffect, useState} from "react";
import classes from "./JournalItem.module.css";
import {useContext} from "react";
import JournalDetailContext from "../../store/JournalDetailContext";

import CheckCircle from "../icon/CheckCircle";
import ExclamationCircle from "../icon/ExclamationCircle";
import LightBulb from "../icon/LightBulb";
import Flag from "../icon/Flag";




const typeToIcon = (type) => {
    if (type === 'event') {
        return LightBulb;
    }
    if (type === 'notes') {
        return Flag;
    }
    if (type === 'task') {
        return ExclamationCircle;
    }
    if (type === 'taskOK'){
        return CheckCircle
    }
};

const JournalItem = (props) => {
    const detailLogCtx = useContext(JournalDetailContext);
    const {detailLog,changedLog,clearChangedLog}= detailLogCtx;
    const {item} = props;
    const [iconType,setIconType]=useState(item.type);
    const Icon = typeToIcon(iconType);

    useEffect(()=>{
        if(changedLog){
            props.onChangeLog(changedLog);
            clearChangedLog();
        }
    },[changedLog])

    const clickIcon=()=>{
        if(iconType==='task'){
            setIconType('taskOK')
            props.onChangeLog({...item,type:'taskOK'});
        }
        if(iconType==='taskOK'){
            setIconType('task')
            props.onChangeLog({...item,type:'task'});
        }
    }

    const clickTitle=()=>{
        detailLogCtx.showDetailLog(item);
    };

    const itemClass = `${classes.item} ${iconType==='task'?classes.task:''}`

    return <li className={itemClass}>
          <span className={classes.icon} onClick={clickIcon}>
            <Icon/>
          </span>
          <span onClick={clickTitle}>{item.title}</span>
    </li>;
};
export default JournalItem;