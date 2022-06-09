import classes from "./LogItemEditor.module.css";
import {useContext, useState} from "react";
import Calendar from "../icon/Calendar";
import Hashtag from "../icon/Hashtag";
import ChatAlt from "../icon/ChatAlt";
import Save from "../icon/Save";
import Trash from "../icon/Trash";
import XCircle from "../icon/XCircle";
import Pencil from "../icon/Pencil";
import LanguageContext from "../../store/LanguageContext";

const formatDate = (dateStr) => {
    return dateStr.replace(/-/g, '/')
}

const unFormatDate = (dateStr) => {
    return dateStr.replace(/\//g, '-')
}

const LogItemEditor = (props) => {
    const {detailLog,saveDetailLog,hideDetailLog} = props.journalCtx;
    const {languageText} = useContext(LanguageContext);

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

            <h2><Pencil/> {languageText.editLogTitle}</h2>
            <div className={classes.control}>
                <label htmlFor="title"><ChatAlt/> {languageText.editLogContent}</label>
                <textarea rows="3" id="title" value={title} onChange={event => setTitle(event.target.value)}/>
            </div>

            <div className={classes.row}>
                <div className={classes.control}>
                    <label htmlFor="date"><Calendar/> {languageText.editLogsDate}</label>
                    <input type="date" id="date" value={date} onChange={event => setDate(event.target.value)}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor="date"><Hashtag/> {languageText.editLogTag}</label>
                    <input type="text" id="tag" value={tag} onChange={event => setTag(event.target.value)}/>
                </div>
            </div>


            <div className={classes.detailModal__actions}>
                <button type="button" onClick={saveDetailLogHandler}>
                    <Save/> {languageText.editLogsSave}
                </button>
                <button type="button" onClick={deleteDetailLogHandler}>
                    <Trash/> {languageText.editLogsDelete}
                </button>
                <button type="button" onClick={hideDetailLog}>
                    <XCircle/> {languageText.editLogsCancel}
                </button>
            </div>

        </div>
    </>
};
export default LogItemEditor;