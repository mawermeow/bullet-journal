import classes from "./ControlButton.module.css";

const ControlButton = (props) => {

    const {sortLog, showPastLog, showFutureLog, showTaskLog} = props;


    return <div className={classes.controlButton}>
        <span className={showPastLog ? classes.unControlButton:''}>
            <button onClick={() => props.onTogglePastLog()}>
                過去筆記
            </button>
        </span>
        <span className={showFutureLog ? classes.unControlButton:''}>
            <button onClick={() => props.onToggleFutureLog()}>
                未來筆記
            </button>
        </span>
        <span className={showTaskLog ? classes.unControlButton:''}>
            <button onClick={() => props.onToggleTaskLog()}>
                僅任務
            </button>
        </span>
        <button onClick={() => props.onToggleSortLog()}>
            {sortLog ? '舊>新' : '新>舊'}
        </button>

    </div>
};

export default ControlButton;