import classes from "./JournalList.module.css";
import JournalItem from "./JournalItem";
import NotificationContext from "../../store/NotificationContext";
import {useContext} from "react";

const JournalList=(props)=>{
    const {items}=props;
    const notificationCtx = useContext(NotificationContext);

    const onChangeLog=(updateItem)=>{
        const newItems = items.map(item=>{
            if(item.id===updateItem.id){
                return updateItem
            }
            return item
        })

        notificationCtx.showNotification({status:'render',title:'上傳中',message:'正在修改您的筆記'});
        fetch('/api/user/change-journal',{
            method:'PATCH',
            body:JSON.stringify(newItems),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>{
            if(res.ok){
                notificationCtx.showNotification({status:'success',title:'成功',message:'筆記修改完成'});
            }else{
                notificationCtx.showNotification({status:'error',title:'錯誤',message:'筆記修改失敗，請重新嘗試'});
            }
        })
    };

    return <div className={classes.bullet}>
        <ul>
            {items && items.length>0 && items.map(item=> <JournalItem
                key={item.id}
                data={item}
                onChangeLog={onChangeLog}
            />)}
        </ul>

    </div>
}

export default JournalList;