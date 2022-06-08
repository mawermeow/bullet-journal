import classes from "./ControlButton.module.css";
import {useContext} from "react";
import JournalDetailContext from "../../store/JournalDetailContext";

const ControlButton = (props) => {
    const {multiChangedLog,setMultiChangedLog} = useContext(JournalDetailContext);

    const {sortLog, showPastLog, showFutureLog, showTaskLog,editMode} = props;

    return <div className={classes.controlButton}>
        <span className={showPastLog ? classes.unControlButton:''}>
            <button onClick={() => props.onTogglePastLog()}>
                過去
            </button>
        </span>
        <span className={showFutureLog ? classes.unControlButton:''}>
            <button onClick={() => props.onToggleFutureLog()}>
                未來
            </button>
        </span>
        <span className={showTaskLog ? classes.unControlButton:''}>
            <button onClick={() => props.onToggleTaskLog()}>
                任務
            </button>
        </span>
        <span className={editMode ? classes.unControlButton:''}>
            <button onClick={() => {
                if(multiChangedLog.length>0){
                    setMultiChangedLog([]);
                }
                props.onToggleEditMode()
            }}>
                編輯
            </button>
        </span>
        <button onClick={() => props.onToggleSortLog()}>
            {sortLog ? '舊>新' : '新>舊'}
        </button>

    </div>
};

export default ControlButton;