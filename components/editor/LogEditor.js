import AddLogForm from "./AddLogForm";
import ControlButton from "./ControlButton";
import LogLists from "../bullet/LogLists";
import {useEffect, useState} from "react";
import cleanArray from "../../lib/clean-array";
import localDate from "../../lib/local-date";
import LoadingSpinner from "../ui/LoadingSpinner";
import AddLogForm_TagHead from "./AddLogForm_TagHead";

const LogEditor = (props) => {
    const {logs,tagName}=props;

    const [showFutureLog, setShowFutureLog] = useState(false);
    const [showTaskLog, setShowTaskLog] = useState(false);
    const toggleFutureLog = () => setShowFutureLog(prevState => !prevState);
    const toggleTaskLog = () => setShowTaskLog(prevState => !prevState);

    const [pastDateList, setPastDateList] = useState([]);
    const [futureDateList, setFutureDateList] = useState([]);

    const splitLogsFromToday = (originalLogs) => {
        const allDateList = cleanArray(originalLogs.map(log => log.date));

        let futureDateArray = [''];
        const pastDateArray = allDateList.filter(dateItem => {
            if (localDate >= dateItem) {
                return dateItem
            } else {
                futureDateArray.push(dateItem);
            }
        })
        setPastDateList(pastDateArray);
        setFutureDateList(futureDateArray);
    };

    useEffect(() => {
        if (logs) {
            splitLogsFromToday(logs);
        }
    }, [logs, showTaskLog]);

    return <>
        {tagName && <AddLogForm_TagHead tagName={tagName}/>}
        <AddLogForm tagName={tagName}/>
        <ControlButton
            onToggleFutureLog={toggleFutureLog}
            onToggleTaskLog={toggleTaskLog}
            showTaskLog={showTaskLog}
            showFutureLog={showFutureLog}
        />
        {!logs && <div className="center"><LoadingSpinner/></div>}
        {logs && showFutureLog && <LogLists dateList={futureDateList} logs={logs} showTaskLog={showTaskLog}/>}
        {logs && <LogLists dateList={pastDateList} logs={logs} showTaskLog={showTaskLog}/>}
    </>
};

export default LogEditor;