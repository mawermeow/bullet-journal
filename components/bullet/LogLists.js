import LogList from "./LogList";
import localDate from "../../lib/local-date";

const LogLists = (props) => {
    const {dateList, logs, showTaskLog} = props;

    const validationRules = (date,log)=>{
        return showTaskLog?(log.date === date):(log.date === date && log.type === 'task');
    };

    return dateList.map(date => {
        const oneDateLogs = logs.filter(log => {
            if (validationRules(date,log)) {
                return log;
            }
        })

        const dateTitle = `${date === localDate ? 'Today ✩ ' : date === '' ? '很久以後' : ''}${date}`;

        if (oneDateLogs.length > 0) {
            return <LogList key={dateTitle} items={oneDateLogs} dateTitle={dateTitle}/>
        }
    });
};

export default LogLists;