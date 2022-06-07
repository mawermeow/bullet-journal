import classes from "./LogItemEditor.module.css";
import {useState} from "react";
import Calendar from "../icon/Calendar";
import Hashtag from "../icon/Hashtag";
import ChatAlt from "../icon/ChatAlt";
import Save from "../icon/Save";
import Trash from "../icon/Trash";
import XCircle from "../icon/XCircle";
import Pencil from "../icon/Pencil";

const formatDate = (dateStr) => {
    return dateStr.replace(/-/g, '/')
}

const unFormatDate = (dateStr) => {
    return dateStr.replace(/\//g, '-')
}

const LogItemEditor = (props) => {
    const {detailLog,saveDetailLog,hideDetailLog} = props.journalCtx;

    const [title, setTitle] = useState(detailLog.title);
    const [tag, setTag] = useState(detailLog.tag);
    const [date, setDate] = useState(unFormatDate(detailLog.date));

    const saveDetailLogHandler = () => {
        const newDate = formatDate(date);
        const formattedTag = tag.replace(/\s/g, '').replace(/#＃/g, '');
        saveDetailLog({...detailLog, title, date: newDate, tag:formattedTag});
    };

    const deleteDetailLogHandler = () => {
        saveDetailLog({...detailLog, type: 'DELETE'});
    };

    return <>
        <div className={classes.backdrop} onClick={hideDetailLog}/>
        <div className={classes.detailModal}>

            <h2><Pencil/> 編輯筆記</h2>
            <div className={classes.control}>
                <label htmlFor="title"><ChatAlt/> 內容</label>
                <textarea rows="3" id="title" value={title} onChange={event => setTitle(event.target.value)}/>
            </div>

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
                <button type="button" onClick={saveDetailLogHandler}>
                    <Save/> 儲存
                </button>
                <button type="button" onClick={deleteDetailLogHandler}>
                    <Trash/> 刪除
                </button>
                <button type="button" onClick={hideDetailLog}>
                    <XCircle/> 取消
                </button>
            </div>

        </div>
    </>
};
export default LogItemEditor;