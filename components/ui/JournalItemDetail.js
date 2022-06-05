import classes from "./JournalItemDetail.module.css";
import {useContext} from "react";
import JournalDetailContext from "../../store/JournalDetailContext";

const JournalItemDetail=(props)=>{
    const detailLogCtx = useContext(JournalDetailContext);
    const {itemData} = props;

    return <>
        <div className={classes.backdrop} onClick={detailLogCtx.hideDetailLog} />
        <div className={classes.detailModal}>
            <h2>修改</h2>
            <p>編輯內容{itemData.title}</p>

            <div className={classes.detailModal__actions}>
                <button type="button" onClick={detailLogCtx.hideDetailLog}>
                    Okay
                </button>
            </div>
        </div>
    </>
};
export default JournalItemDetail;