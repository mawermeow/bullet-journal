import {createContext, useState} from "react";

const JournalDetailContext = createContext({
    detailLog: null,
    showDetailLog: (detailLog) => {},
    hideDetailLog: () => {},
    saveDetailLog: (enteredLog) => {},
    changedLog: null,
    clearChangedLog: () => {},
    logs: null,
    saveLogs: (newLogs) => {},
    multiChangedLog: [],
    setMultiChangedLog: () => {}
});

export const JournalContextProvider = props => {
        const [detailLog, setDetailLog] = useState();
        const [changedLog, setChangedLog] = useState();
        const [logs, setLogs] = useState();
        const [multiChangedLog, setMultiChangedLog] = useState([]);
        const [language, setLanguage] = useState('zh');




        const showDetailLog = (detailLog) => {
            setDetailLog(detailLog);
        }

        const hideDetailLog = () => {
            setDetailLog(null);
        };

        const saveDetailLog = (enteredLog) => {
            setChangedLog(enteredLog);
            hideDetailLog();
        };

        const clearChangedLog = () => {
            setChangedLog(null);
        }

        const saveLogs = (newLogs) => {
            setLogs(newLogs);
        };


        return <JournalDetailContext.Provider value={{
            detailLog, showDetailLog, hideDetailLog, saveDetailLog, changedLog, clearChangedLog,
            logs, saveLogs, multiChangedLog, setMultiChangedLog
        }}>
            {props.children}
        </JournalDetailContext.Provider>
    }
;

export default JournalDetailContext;