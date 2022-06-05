import classes from "./AddLog.module.css";
import {useState,useContext} from "react";
import NotificationContext from "../../store/NotificationContext";

import ExclamationCircle from "../icon/ExclamationCircle";
import LightBulb from "../icon/LightBulb";
import Flag from "../icon/Flag";

const AddLog=(props)=>{
    const [logType,setLogType] = useState('');
    const [logTitle,setLogTitle] = useState('');

    const notificationCtx = useContext(NotificationContext);

    const addLogHandler=async (event)=>{
        event.preventDefault();

        if(logTitle.trim().length===0){
            notificationCtx.showNotification({status:'error',title:'錯誤',message:'筆記不得為空白'});
            return;
        }

        const d = new Date();

        const newLog = {
            title:logTitle,
            type:logType,
            id:d.toLocaleString('chinese',{hour12:false}),
            date:d.toISOString().slice(0, 10)
        };

        notificationCtx.showNotification({status:'render',title:'更新中',message:'正在更新您的筆記'});
        const result = await fetch('api/user/journal',{
            method:'PATCH',
            body:JSON.stringify(newLog),
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(result.ok){
            notificationCtx.showNotification({status:'success',title:'成功',message:'筆記更新完成'});
            props.onAddLog(newLog);
            setLogTitle('')
        }else{
            notificationCtx.showNotification({status:'error',title:'錯誤',message:'筆記新增失敗'});
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