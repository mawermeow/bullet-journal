import {useEffect, useState} from "react";
import classes from "./LogItem.module.css";
import {useContext} from "react";
import JournalDetailContext from "../../store/JournalDetailContext";
import useUpdate from "../../hooks/useUpdate";

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

const LogItem = (props) => {
    const {changedLog,clearChangedLog,showDetailLog,setMultiChangedLog} = useContext(JournalDetailContext);
    const {item,editMode,setEditMode} = props;
    const [iconType,setIconType]=useState(item.type);
    const Icon = typeToIcon(iconType);
    const {updateLog} = useUpdate();
    const [checked,setChecked]=useState(false);

    useEffect(()=>{
        if(changedLog){
            updateLog(changedLog);
            clearChangedLog();
        }
    },[changedLog])

    const clickIcon=()=>{
        if(iconType==='task'){
            setIconType('taskOK')
            updateLog({...item,type:'taskOK'});
        }
        if(iconType==='taskOK'){
            setIconType('task')
            updateLog({...item,type:'task'});
        }
    }

    const clickTitle=()=>{
        setEditMode(false);
        showDetailLog(item);
    };

    const itemClass = `${classes.item} ${iconType==='task'?classes.task:''}`

    if(checked){
        if(!editMode){
            setChecked(false);
        }
    }

    return <li className={itemClass}>
        {editMode && <span>
            <input type="checkbox" checked={checked} onChange={(event)=>{
                setChecked(prevState => !prevState);
                if(!checked){
                    setMultiChangedLog(prev=>[...prev,item]);
                }else{
                    setMultiChangedLog(prev=>prev.filter(log=>{
                        if(log!==item){
                            return log;
                        }
                    }))
                }
            }}/>
        </span>}
          <span className={classes.icon} onClick={clickIcon}>
            <Icon/>
          </span>
          <span onClick={clickTitle}>{item.title}</span>
    </li>;
};
export default LogItem;