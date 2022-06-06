import classes from "./ControlButton.module.css";

const ControlButton=(props)=>{

    const{showFutureLog, showTaskLog} = props;

    return <div className={classes.controlButton}>
        <button onClick={()=>props.onToggleFutureLog()}>
            {showFutureLog ? '隱藏' : '顯示'}未來筆記
        </button>
        <button onClick={()=>props.onToggleTaskLog()}>
            {showTaskLog ? '所有筆記項目' : '待辦事項清單'}
        </button>
    </div>
};

export default ControlButton;