import {useContext} from "react";
import JournalDetailContext from "../store/JournalDetailContext";

const Language=()=>{
    const {language} = useContext(JournalDetailContext);

    let languageText;

    if (language === 'zh') {
        languageText = {
            logo: '子彈筆記',
            buttonTask: '任務',
            buttonEvent: '經驗',
            buttonNotes: '註記',
            buttonControlPast: '過去',
            buttonControlFuture: '未來',
            buttonControlTask: '任務',
            buttonControlEdit: '編輯',
            buttonControlOldNew: '舊>新',
            buttonControlNewOld: '新>舊',
            listForEver: '很久以後',
            editLogsTitle: '編輯多則筆記',
            editLogsDate: '執行日期',
            editLogTag: '自定義標籤',
            editLogsSave: '儲存',
            editLogsDelete: '刪除',
            editLogsCancel: '取消',
            editLogTitle: '編輯筆記',
            editLogContent: '內容'
        }
    }
    if (language === 'en') {
        languageText = {
            logo: 'BulletNote',
            buttonTask: 'Task',
            buttonEvent: 'Event',
            buttonNotes: 'Notes',
            buttonControlPast: 'Past',
            buttonControlFuture: 'Future',
            buttonControlTask: 'Just Task',
            buttonControlEdit: 'Edit',
            buttonControlOldNew: 'Old>New',
            buttonControlNewOld: 'New>Old',
            listForEver: 'AFTER A LONG TIME',
            editLogsTitle: 'Edit Multiple Notes',
            editLogsDate: 'Execution Date',
            editLogTag: 'Custom Label',
            editLogsSave: 'Save',
            editLogsDelete: 'Delete',
            editLogsCancel: 'Cancel',
            editLogTitle: 'Edit Notes',
            editLogContent: 'Contents'
        }
    }
    return languageText;
};

export default Language;