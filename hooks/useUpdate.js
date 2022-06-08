import {useContext} from "react";
import NotificationContext from "../store/NotificationContext";
import JournalDetailContext from "../store/JournalDetailContext";

const useUpdate = () => {
    const {showNotification} = useContext(NotificationContext);
    const {logs, saveLogs} = useContext(JournalDetailContext);

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

    const onChangeLogs = (updateItems) => {
        const {multiChangedLog} = updateItems;
        let updatedItems;

        const updateIds = multiChangedLog.map(item => item.id);

        if (updateItems.type === 'DELETE') {
            updatedItems = logs.filter(item => {
                if (!updateIds.includes(item.id)) {
                    return item;
                }
            })
        } else {
            const {date, tag} = updateItems;
            updatedItems = logs.map(item => {
                if (updateIds.includes(item.id)) {
                    let newItem = {...item};
                    if (date) {
                        newItem = {...item, date};
                    }
                    if (tag) {
                        newItem = {...item, tag}
                    }
                    return newItem
                }
                return item
            })
        }
        updateJournal(updatedItems);
    }

    return {updateLog: onChangeLog, updateLogs: onChangeLogs}
}

export default useUpdate;