import AddLogForm from "./AddLogForm";
import ControlButton from "./ControlButton";
import LogLists from "../bullet/LogLists";
import {useEffect, useState} from "react";
import cleanArray from "../../lib/clean-array";
import localDate from "../../lib/local-date";
import LoadingSpinner from "../ui/LoadingSpinner";
import AddLogForm_TagHead from "./AddLogForm_TagHead";

const LogEditor = (props) => {
    const {logs, tagName} = props;

    const [sortLog, setSortLog] = useState(true);
    const [showPastLog, setShowPastLog] = useState(false);
    const [showFutureLog, setShowFutureLog] = useState(true);

    const [showTaskLog, setShowTaskLog] = useState(false);
    // const togglePastLog = () => setShowPastLog(prevState => !prevState);
    // const toggleFutureLog = () => setShowFutureLog(prevState => !prevState);
    // const toggleTaskLog = () => setShowTaskLog(prevState => !prevState);
    // const toggleSortLog = () => setSortLog(prevState => !prevState);

    const [nowDateList, setNowDateList] = useState([]);
    const [pastDateList, setPastDateList] = useState([]);
    const [futureDateList, setFutureDateList] = useState([]);

    const splitLogsFromToday = (originalLogs) => {
        const allDateList = cleanArray(originalLogs.map(log => log.date));

        if (sortLog) {
            allDateList.reverse();
        }

        let todayDataArray = [''];
        let futureDateArray = [''];
        const pastDateArray = allDateList.filter(dateItem => {
            if (localDate > dateItem) {
                return dateItem
            }
            if (localDate < dateItem) {
                futureDateArray.push(dateItem);
            } else {
                todayDataArray.push(dateItem);
            }
        })

        setNowDateList(todayDataArray);
        setPastDateList(pastDateArray);
        setFutureDateList(futureDateArray);
    };

    useEffect(() => {
        if (logs) {
            splitLogsFromToday(logs);
        }
    }, [logs, sortLog]);

    const pastLog = <LogLists dateList={pastDateList} logs={logs} showTaskLog={showTaskLog}/>
    const nowLog = <LogLists dateList={nowDateList} logs={logs} showTaskLog={showTaskLog}/>
    const futureLog = <LogLists dateList={futureDateList} logs={logs} showTaskLog={showTaskLog}/>

    return <>
        {tagName && <AddLogForm_TagHead tagName={tagName}/>}
        <AddLogForm tagName={tagName}/>
        <ControlButton
            onToggleSortLog={()=>setSortLog(prevState => !prevState)}
            onToggleTaskLog={()=>setShowTaskLog(prevState => !prevState)}
            onTogglePastLog={()=>setShowPastLog(prevState => !prevState)}
            onToggleFutureLog={()=>setShowFutureLog(prevState => !prevState)}
            sortLog={sortLog}
            showTaskLog={showTaskLog}
            showPastLog={showPastLog}
            showFutureLog={showFutureLog}
        />
        {!logs && <div className="center"><LoadingSpinner/></div>}

        {logs && sortLog && showPastLog && pastLog}
        {logs && !sortLog && showFutureLog && futureLog}
        {logs && nowLog}
        {logs && !sortLog && showPastLog && pastLog}
        {logs && sortLog && showFutureLog && futureLog}
    </>
};

export default LogEditor;