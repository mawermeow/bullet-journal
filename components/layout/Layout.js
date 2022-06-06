import MainNavigation from "./MainNavigation";
import NotificationContext from "../../store/NotificationContext";
import Notification from "../ui/Notification";
import JournalDetailContext from "../../store/JournalDetailContext";
import LogItemEditor from "../editor/LogItemEditor";
import {useContext} from "react";

const Layout=(props)=>{
    const notificationCtx=useContext(NotificationContext);
    const notification = notificationCtx.notification;

    const detailLogCtx = useContext(JournalDetailContext);
    const detailLog = detailLogCtx.detailLog;

    return <>
        <MainNavigation/>
        <main>{props.children}</main>
        {detailLog && <LogItemEditor/>}
        {notification && <Notification
            title={notification.title}
            message={notification.message}
            status={notification.status}
        />}
    </>
};
export default Layout;