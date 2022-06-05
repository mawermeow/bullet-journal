import classes from "./JournalList.module.css";
import JournalItem from "./JournalItem";
import NotificationContext from "../../store/NotificationContext";
import {useContext, useEffect, useState} from "react";

const JournalList = (props) => {

    const {items, dateTitle} = props;

    const onChangeLog = (updateItem) => {
        props.onChangeLog(updateItem);
    };

    const isFuture = dateTitle.includes('✩');

    return <div className={isFuture ? classes.future : ''}>
        <div className={classes.bullet}>
            <h2>{dateTitle}</h2>
            <ul>
                {items && items.length > 0 && items.map(item => <JournalItem
                    key={item.id}
                    item={item}
                    onChangeLog={onChangeLog}
                />)}
            </ul>
        </div>
    </div>
}

export default JournalList;