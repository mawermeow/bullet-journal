import LogList from "./LogList";
import localDate from "../../lib/local-date";
import {useContext} from "react";
import LanguageContext from "../../store/LanguageContext";

const LogLists = (props) => {
    const {dateList, status} = props;
    const {logs, showTaskLog, editMode, setEditMode} = status;
    const {languageText} = useContext(LanguageContext);

    const validationRules = (date,log)=>{
        return showTaskLog?(log.date === date && log.type === 'task'):(log.date === date);
    };

    return dateList.map(date => {
        const oneDateLogs = logs.filter(log => {
            if (validationRules(date,log)) {
                return log;
            }
        })

        const dateTitle = `${date === localDate ? 'Today ✩ ' : date === '' ? languageText.listForEver : ''}${date}`;

        if (oneDateLogs.length > 0) {
            return <LogList key={dateTitle} items={oneDateLogs} dateTitle={dateTitle} editMode={editMode} setEditMode={setEditMode}/>
        }
    });
};

export default LogLists;