import classes from "./LogItemsEditor.module.css";
import {useState} from "react";
import Calendar from "../icon/Calendar";
import Hashtag from "../icon/Hashtag";
import ChatAlt from "../icon/ChatAlt";
import Save from "../icon/Save";
import Trash from "../icon/Trash";
import XCircle from "../icon/XCircle";
import Pencil from "../icon/Pencil";
import useUpdate from "../../hooks/useUpdate";
import {useContext} from "react";
import JournalDetailContext from "../../store/JournalDetailContext";

const formatDate = (dateStr) => {
    return dateStr.replace(/-/g, '/')
}

const LogItemEditor = (props) => {
    const {multiChangedLog, setMultiChangedLog} = useContext(JournalDetailContext);
    const [tag, setTag] = useState('');
    const [date, setDate] = useState('');
    const {updateLogs} = useUpdate();

    const closeHandler = () => {
        setMultiChangedLog([]);
        props.onClose();
    }

    const saveLogsHandler = () => {
        const newDate = formatDate(date);
        const formattedTag = tag.replace(/\s/g, '').replace(/#＃/g, '');
        updateLogs({multiChangedLog, date: newDate, tag: formattedTag});
        closeHandler();
    };

    const deleteLogsHandler = () => {
        updateLogs({multiChangedLog, type: 'DELETE'});
        closeHandler();
    }


    return <>
        <div className={classes.detailModal}>
            <h2><Pencil/> 編輯多則筆記</h2>
            <div className={classes.row}>
                <div className={classes.control}>
                    <label htmlFor="date"><Calendar/> 執行日期</label>
                    <input type="date" id="date" value={date} onChange={event => setDate(event.target.value)}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor="date"><Hashtag/> 自定義標籤</label>
                    <input type="text" id="tag" value={tag} onChange={event => setTag(event.target.value)}/>
                </div>
            </div>


            <div className={classes.detailModal__actions}>
                <button type="button" onClick={saveLogsHandler}>
                    <Save/> 儲存
                </button>
                <button type="button" onClick={deleteLogsHandler}>
                    <Trash/> 刪除
                </button>
                <button type="button" onClick={closeHandler}>
                    <XCircle/> 取消
                </button>
            </div>

        </div>
    </>
};
export default LogItemEditor;