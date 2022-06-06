import {useEffect, useContext} from "react";
import JournalDetailContext from "../store/JournalDetailContext";
import NotificationContext from "../store/NotificationContext";


const useJournal = () => {
    const {logs,saveLogs} = useContext(JournalDetailContext)
    const {showNotification} = useContext(NotificationContext);

    useEffect(() => {
        if(!logs){
            showNotification({status: 'render', title: '讀取中', message: '正在取得您的筆記'});
            fetch('/api/user/journal').then(res => {
                if (!res.ok) {
                    showNotification({status: 'error', title: '錯誤', message: '筆記獲取失敗'});
                    return;
                }
                showNotification({status: 'success', title: '成功', message: '筆記獲取完成'});
                return res.json()
            }).then(data => {
                    saveLogs(data.items);
                }
            );
        }
    }, [])
}

export default useJournal;