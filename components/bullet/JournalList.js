import classes from "./JournalList.module.css";
import JournalItem from "./JournalItem";
import {useContext, useEffect} from "react";
import NotificationContext from "../../store/NotificationContext";
import JournalDetailContext from "../../store/JournalDetailContext";

const JournalList = (props) => {

    const {items, dateTitle} = props;
    const {showNotification} = useContext(NotificationContext);
    const {logs,saveLogs} = useContext(JournalDetailContext);

    const updateJournal = (updateItems) => {
        showNotification({status: 'render', title: '更新中', message: '正在更新您的筆記'});
        fetch('/api/user/change-journal', {
            method: 'PATCH',
            body: JSON.stringify(updateItems),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.ok) {
                saveLogs(updateItems);
                showNotification({status: 'success', title: '更新成功', message: '筆記修改完成'});
            } else {
                showNotification({status: 'error', title: '錯誤', message: '筆記修改失敗，請重新嘗試'});
            }
        })
    };

    const onChangeLog = (updateItem) => {
        let updateItems;

        if (updateItem.type === 'DELETE') {
            updateItems = logs.filter(item => {
                if (item.id !== updateItem.id) {
                    return item;
                }
            })
        } else {
            updateItems = logs.map(item => {
                if (item.id === updateItem.id) {
                    return updateItem
                }
                return item
            })
        }
        updateJournal(updateItems);
    }

    const isToday = dateTitle.includes('✩');

    const isTagMode = dateTitle.includes('★');

    return <div className={isToday ? classes.today : ''}>
        <div className={classes.bullet}>
            <h2>{dateTitle}</h2>
            <ul>
                {items && items.length > 0 && items.map(item => <JournalItem
                    key={item.id}
                    item={item}
                    onChangeLog={onChangeLog}
                    tagMode={isTagMode}
                />)}
            </ul>
        </div>
    </div>
}

export default JournalList;