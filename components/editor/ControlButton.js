import classes from "./ControlButton.module.css";

const ControlButton = (props) => {

    const {sortLog, showPastLog, showFutureLog, showTaskLog} = props;


    return <div className={classes.controlButton}>
        <span className={showFutureLog ? classes.unControlButton:''}>
            <button onClick={() => props.onToggleFutureLog()}>
                {/*{showFutureLog ? '隱藏' : '顯示'}*/}
                未來筆記
            </button>
        </span>
        <span className={showPastLog ? classes.unControlButton:''}>
            <button onClick={() => props.onTogglePastLog()}>
                {/*{showFutureLog ? '隱藏' : '顯示'}*/}
                過去筆記
            </button>
        </span>
        <span className={showTaskLog ? classes.unControlButton:''}>
            <button onClick={() => props.onToggleTaskLog()}>
                {/*{showTaskLog ? '所有筆記項目' : '待辦事項清單'}*/}
                僅任務
            </button>
        </span>
        <button onClick={() => props.onToggleSortLog()}>
            {sortLog ? '舊>新' : '新>舊'}
        </button>

    </div>
};

export default ControlButton;