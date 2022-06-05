import classes from "./JournalList.module.css";
import JournalItem from "./JournalItem";
import NotificationContext from "../../store/NotificationContext";
import {useContext, useEffect, useState} from "react";

const JournalList=(props)=>{
    const [items,setItems] = useState([]);
    const notificationCtx = useContext(NotificationContext);

    useEffect(()=>{
        setItems(props.items);
    },[props.items])

    const updateJournal=(updateItems)=>{
        notificationCtx.showNotification({status:'render',title:'更新中',message:'正在更新您的筆記'});
        fetch('/api/user/change-journal',{
            method:'PATCH',
            body:JSON.stringify(updateItems),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>{
            if(res.ok){
                setItems(updateItems);
                notificationCtx.showNotification({status:'success',title:'更新成功',message:'筆記修改完成'});
            }else{
                notificationCtx.showNotification({status:'error',title:'錯誤',message:'筆記修改失敗，請重新嘗試'});
            }
        })
    };

    const onChangeLog=(updateItem)=>{
        let updateItems;

        if(updateItem.type==='DELETE'){
            updateItems = items.filter(item=>{
                if(item.id!==updateItem.id){
                    return item;
                }
            })
        }else{
            updateItems = items.map(item=>{
                if(item.id===updateItem.id){
                    return updateItem
                }
                return item
            })

        }
        updateJournal(updateItems)
    };

    return <div className={classes.bullet}>
        <ul>
            {items && items.length>0 && items.map(item=> <JournalItem
                key={item.id}
                item={item}
                onChangeLog={onChangeLog}
            />)}
        </ul>

    </div>
}

export default JournalList;