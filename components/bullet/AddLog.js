import classes from "./AddLog.module.css";
import {useState,useContext} from "react";
import NotificationContext from "../../store/NotificationContext";

import ExclamationCircle from "../icon/ExclamationCircle";
import LightBulb from "../icon/LightBulb";
import Flag from "../icon/Flag";
import JournalDetailContext from "../../store/JournalDetailContext";

const AddLog=(props)=>{
    const [logType,setLogType] = useState('');
    const [logTitle,setLogTitle] = useState('');
    const {logs, saveLogs} = useContext(JournalDetailContext);
    const {showNotification} = useContext(NotificationContext);
    const {tagName} = props;

    const addLogHandler=async (event)=>{
        event.preventDefault();

        if(logTitle.trim().length===0){
            showNotification({status:'error',title:'錯誤',message:'筆記不得為空白'});
            return;
        }

        const d = new Date();
        const date = d.getFullYear()+'/'+(d.getMonth()+1).toString().padStart(2,'0')+'/'+d.getDate().toString().padStart(2,'0');

        const newLog = {
            title:logTitle,
            type:logType,
            id:d.toLocaleString('chinese',{hour12:false}),
            date,
            tag:tagName||'',
        };

        showNotification({status:'render',title:'更新中',message:'正在更新您的筆記'});
        const result = await fetch('/api/user/journal',{
            method:'PATCH',
            body:JSON.stringify(newLog),
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(result.ok){
            showNotification({status:'success',title:'成功',message:'筆記更新完成'});
            saveLogs(prevState => [newLog, ...prevState]);
            setLogTitle('')
        }else{
            showNotification({status:'error',title:'錯誤',message:'筆記新增失敗'});
        }
    };

    return (
        <section className={classes['log-item']}>
            <form className={classes.form} onSubmit={addLogHandler}>
                <div className={classes.control}>
                    <input type="text" value={logTitle}
                           onChange={(event)=>{setLogTitle(event.target.value)}}
                    />
                </div>

                <div className={classes.actions}>
                    <button onClick={()=>setLogType('task')}><ExclamationCircle/> 任務</button>
                    <button onClick={()=>setLogType('event')}><LightBulb/> 經驗</button>
                    <button onClick={()=>setLogType('notes')}><Flag/> 註記</button>
                </div>
            </form>
        </section>
    );
};
export default AddLog;