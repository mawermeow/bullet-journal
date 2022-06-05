import {createContext,useState} from "react";

const JournalDetailContext = createContext({
    detailLog:null,
    showDetailLog:(detailLog)=>{},
    hideDetailLog:()=>{}
});

export const JournalContextProvider = props =>{
    const [detailLog,setDetailLog] = useState([]);

    const showDetailLog=(detailLog)=>{
        setDetailLog(detailLog);
    }

    const hideDetailLog=()=>{
        setDetailLog(null);
    };


    return <JournalDetailContext.Provider value={{
        detailLog, showDetailLog,hideDetailLog
    }}>
        {props.children}
    </JournalDetailContext.Provider>
};

export default JournalDetailContext;