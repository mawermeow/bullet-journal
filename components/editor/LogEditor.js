import AddLogForm from "./AddLogForm";
import ControlButton from "./ControlButton";
import LogLists from "../bullet/LogLists";
import {useEffect, useState} from "react";
import cleanArray from "../../lib/clean-array";
import localDate from "../../lib/local-date";
import LoadingSpinner from "../ui/LoadingSpinner";
import AddLogForm_TagHead from "./AddLogForm_TagHead";
import LogItemsEditor from "./LogItemsEditor";

const LogEditor = (props) => {
    const {logs, tagName, showStatus} = props;

    const [editMode, setEditMode] = useState(false);
    const [sortLog, setSortLog] = useState(true);
    const [showTaskLog, setShowTaskLog] = useState(false);
    const [showPastLog, setShowPastLog] = useState(showStatus.pastLog);
    const [showFutureLog, setShowFutureLog] = useState(showStatus.futureLog);

    const [dateList,setDateList] = useState({
        now:[],
        past:[],
        future:[]
    });

    const splitLogsFromToday = (originalLogs) => {
        const allDateList = cleanArray(originalLogs.map(log => log.date));

        let todayDataArray = [];
        let futureDateArray = [''];

        const pastDateArray = allDateList.filter(dateItem => {
            if (localDate > dateItem) {
                return dateItem
            }
            if (localDate < dateItem) {
                futureDateArray.push(dateItem);
            }
            if (localDate === dateItem){
                todayDataArray.push(dateItem);
            }
        })

        if (sortLog) {
            pastDateArray.reverse();
            futureDateArray.reverse();
        }

        setDateList({
            now:todayDataArray,
            past:pastDateArray,
            future:futureDateArray
        })
    };

    useEffect(() => {
        if (logs) {
            splitLogsFromToday(logs);
        }
    }, [logs, sortLog]);

    const status = {logs,showTaskLog,editMode,setEditMode};

    const pastLog = <LogLists dateList={dateList.past} status={status}/>
    const nowLog = <LogLists dateList={dateList.now} status={status}/>
    const futureLog = <LogLists dateList={dateList.future} status={status}/>

    return <>
        {tagName && <AddLogForm_TagHead tagName={tagName}/>}
        <AddLogForm tagName={tagName}/>
        <ControlButton
            onToggleSortLog={()=>setSortLog(prevState => !prevState)}
            onToggleTaskLog={()=>setShowTaskLog(prevState => !prevState)}
            onTogglePastLog={()=>setShowPastLog(prevState => !prevState)}
            onToggleFutureLog={()=>setShowFutureLog(prevState => !prevState)}
            onToggleEditMode={()=>setEditMode(prevState => !prevState)}
            sortLog={sortLog}
            showTaskLog={showTaskLog}
            showPastLog={showPastLog}
            showFutureLog={showFutureLog}
            editMode={editMode}
        />
        {!logs && <div className="center"><LoadingSpinner/></div>}
        {logs && editMode && <LogItemsEditor editMode={editMode} onClose={()=>setEditMode(prevState => !prevState)}/>}
        {logs && sortLog && showPastLog && pastLog}
        {logs && !sortLog && showFutureLog && futureLog}
        {logs && nowLog}
        {logs && !sortLog && showPastLog && pastLog}
        {logs && sortLog && showFutureLog && futureLog}
    </>
};

export default LogEditor;