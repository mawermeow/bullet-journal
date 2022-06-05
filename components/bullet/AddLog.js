import classes from "./AddLog.module.css";
import {useState,useContext} from "react";
import NotificationContext from "../../store/NotificationContext";

const AddLog=(props)=>{
    const [logType,setLogType] = useState('');
    const [logTitle,setLogTitle] = useState('');

    const notificationCtx = useContext(NotificationContext);

    const addLogHandler=async (event)=>{
        event.preventDefault();

        const d = new Date();

        const newLog = {
            title:logTitle,
            type:logType,
            year:d.getFullYear(),
            month:d.getMonth(),
            date:d.getDate(),
            id:d.toLocaleString('chinese',{hour12:false})
        };

        notificationCtx.showNotification({status:'render',title:'上傳中',message:'正在新增您的筆記'});
        const result = await fetch('api/user/journal',{
            method:'PATCH',
            body:JSON.stringify(newLog),
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(result.ok){
            notificationCtx.showNotification({status:'success',title:'成功',message:'筆記新增完成'});
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
                    <button onClick={()=>setLogType('task')}>任務</button>
                    <button onClick={()=>setLogType('event')}>經驗</button>
                    <button onClick={()=>setLogType('notes')}>註解</button>
                </div>
            </form>
        </section>
    );
};
export default AddLog;