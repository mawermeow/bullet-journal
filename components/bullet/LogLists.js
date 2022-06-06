import LogList from "./LogList";
import localDate from "../../lib/local-date";

const LogLists = (props) => {
    const {dateList, logs, showTaskLog} = props;

    if (!showTaskLog) {
        return dateList.map(date => {

                const oneDateLogs = logs.filter(log => {
                    if (log.date === date) {
                        return log;
                    }
                });

                const dateTitle = `${date === localDate ? 'Today ✩ ' : date === '' ? '很久以後' : ''}${date}`;

                return <LogList key={dateTitle} items={oneDateLogs} dateTitle={dateTitle}/>
            }
        )
    }

    return dateList.map(date => {
        const oneDateLogs = logs.filter(log => {
            if (log.type === 'task' && log.date === date) {
                return log;
            }
        })

        const dateTitle = `${date === localDate ? 'Today ✩ ' :date===''?'很久以後': ''}${date}`;

        if(oneDateLogs.length>0){
            return <LogList key={dateTitle} items={oneDateLogs} dateTitle={dateTitle}/>
        }
    });
};

export default LogLists;