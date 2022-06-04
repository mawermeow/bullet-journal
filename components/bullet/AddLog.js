import classes from "./AddLog.module.css";
import {useState} from "react";

const AddLog=()=>{
    const [logType,setLogType] = useState('');
    const [logTitle,setLogTitle] = useState('');

    const submitHandler=async (event)=>{
        event.preventDefault();

        const d = new Date();

        const newLog = {
            title:logTitle,
            type:logType,
            year:d.getFullYear(),
            month:d.getMonth(),
            date:d.getDate()
        };

        const result = await fetch('api/user/journal',{
            method:'PATCH',
            body:JSON.stringify(newLog),
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(result.ok){

        }
    };

    return (
        <section className={classes['log-item']}>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <input type="text" value={logTitle}
                           onChange={(event)=>{setLogTitle(event.target.value)}}
                    />
                </div>

                <div className={classes.actions}>
                    <button onClick={()=>setLogType('event')}>事件</button>
                    <button onClick={()=>setLogType('task')}>任務</button>
                    <button onClick={()=>setLogType('notes')}>註解</button>
                </div>
            </form>
        </section>
    );
};
export default AddLog;