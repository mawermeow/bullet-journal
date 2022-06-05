import React,{useState} from "react";

const JournalContext = React.createContext({
    journal:[],
    addLog:(newLog)=>{}
});

export const JournalContextProvider = props =>{
    const [journal,setJournal] = useState([]);

    const addLog=(newLog)=>{
      setJournal(prevJournal=>[newLog,...prevJournal]);
    };

    return <JournalContext.Provider
        value={{journal, addLog}}>
        {props.children}
    </JournalContext.Provider>
};

export default JournalContext;