import JournalList from "./JournalList";
import localDate from "../../lib/local-date";

const JournalLog = (props) => {
    const {dateList, logs, showTaskLog} = props;

    if (!showTaskLog) {
        return dateList.map(date => {

                const oneDateLogs = logs.filter(log => {
                    if (log.date === date) {
                        return log;
                    }
                });

                const dateTitle = `${date === localDate ? 'Today ✩ ' : date === '' ? '很久以後' : ''}${date}`;

                return <JournalList key={dateTitle} items={oneDateLogs} dateTitle={dateTitle}/>
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
            return <JournalList key={dateTitle} items={oneDateLogs} dateTitle={dateTitle}/>
        }
    });
};

export default JournalLog;