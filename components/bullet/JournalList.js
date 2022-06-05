import classes from "./JournalList.module.css";
import JournalItem from "./JournalItem";
import NotificationContext from "../../store/NotificationContext";
import {useContext, useEffect, useState} from "react";

const JournalList=(props)=>{
    // const [items,setItems] = useState([]);
    const {items} = props;
    const notificationCtx = useContext(NotificationContext);

    // useEffect(()=>{
    //     setItems(props.items);
    // },[props.items])

    const onChangeLog=(updateItem)=>{
        props.onChangeLog(updateItem);
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