import classes from "./ControlButton.module.css";
import {useContext} from "react";
import JournalDetailContext from "../../store/JournalDetailContext";
import LanguageContext from "../../store/LanguageContext";

const ControlButton = (props) => {
    const {languageText} = useContext(LanguageContext);
    const {multiChangedLog,setMultiChangedLog} = useContext(JournalDetailContext);

    const {sortLog, showPastLog, showFutureLog, showTaskLog,editMode} = props;

    return <div className={classes.controlButton}>
        <span className={showPastLog ? classes.unControlButton:''}>
            <button onClick={() => props.onTogglePastLog()}>
                {languageText.buttonControlPast}
            </button>
        </span>
        <span className={showFutureLog ? classes.unControlButton:''}>
            <button onClick={() => props.onToggleFutureLog()}>
                {languageText.buttonControlFuture}
            </button>
        </span>
        <span className={showTaskLog ? classes.unControlButton:''}>
            <button onClick={() => props.onToggleTaskLog()}>
                {languageText.buttonControlTask}
            </button>
        </span>
        <span className={editMode ? classes.unControlButton:''}>
            <button onClick={() => {
                if(multiChangedLog.length>0){
                    setMultiChangedLog([]);
                }
                props.onToggleEditMode()
            }}>
                {languageText.buttonControlEdit}
            </button>
        </span>
        <button onClick={() => props.onToggleSortLog()}>
            {sortLog ? languageText.buttonControlOldNew : languageText.buttonControlNewOld}
        </button>

    </div>
};

export default ControlButton;