import {createContext,useState} from "react";

const JournalDetailContext = createContext({
    detailLog:null,
    showDetailLog:(detailLog)=>{},
    hideDetailLog:()=>{},
    saveDetailLog:(enteredLog)=>{},
    changedLog:null,
    clearChangedLog:()=>{}
});

export const JournalContextProvider = props =>{
    const [detailLog,setDetailLog] = useState();
    const [changedLog,setChangedLog] = useState();

    const showDetailLog=(detailLog)=>{
        setDetailLog(detailLog);
    }

    const hideDetailLog=()=>{
        setDetailLog(null);
    };

    const saveDetailLog=(enteredLog)=>{
        setChangedLog(enteredLog);
        hideDetailLog();
    };

    const clearChangedLog=()=>{
        setChangedLog(null);
    }


    return <JournalDetailContext.Provider value={{
        detailLog, showDetailLog,hideDetailLog,saveDetailLog,changedLog,clearChangedLog
    }}>
        {props.children}
    </JournalDetailContext.Provider>
};

export default JournalDetailContext;