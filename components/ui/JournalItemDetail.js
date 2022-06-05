import classes from "./JournalItemDetail.module.css";
import {useContext, useState} from "react";
import JournalDetailContext from "../../store/JournalDetailContext";

const JournalItemDetail = () => {
    const detailLogCtx = useContext(JournalDetailContext);
    const {detailLog} = detailLogCtx;
    const [title, setTitle] = useState(detailLog.title);
    const [date, setDate] = useState(detailLog.date);

    const formatDate =(dateStr)=> {
        return  dateStr.replace(/-/g, '/')
    }

    const saveDetailLog = () => {
        const newDate = formatDate(date);
        detailLogCtx.saveDetailLog({...detailLog, title, date:newDate});
    };

    const deleteDetailLog = () => {
        detailLogCtx.saveDetailLog({...detailLog, type: 'DELETE'});
    };

    return <>
        <div className={classes.backdrop} onClick={detailLogCtx.hideDetailLog}/>
        <div className={classes.detailModal}>

            <h2>編輯筆記</h2>
            <div className={classes.control}>
                <label htmlFor="title">內容</label>
                <textarea rows="3" id="title" value={title} onChange={event => setTitle(event.target.value)}/>
            </div>
            <div className={classes.control}>
                <label htmlFor="date">轉移日期</label>
                <input type="date" id="date" value={date} onChange={event => setDate(event.target.value)}/>
            </div>

            <div className={classes.detailModal__actions}>
                <button type="button" onClick={saveDetailLog}>
                    儲存
                </button>
                <button type="button" onClick={deleteDetailLog}>
                    刪除
                </button>
                <button type="button" onClick={detailLogCtx.hideDetailLog}>
                    取消
                </button>
            </div>

        </div>
    </>
};
export default JournalItemDetail;