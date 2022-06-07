import MainNavigation from "./MainNavigation";
import NotificationContext from "../../store/NotificationContext";
import Notification from "../ui/Notification";
import JournalDetailContext from "../../store/JournalDetailContext";
import LogItemEditor from "../editor/LogItemEditor";
import {useContext} from "react";
import Footer from "./Footer";

const Layout = (props) => {
    const notificationCtx = useContext(NotificationContext);
    const notification = notificationCtx.notification;

    const journalCtx = useContext(JournalDetailContext);

    return <>
        <MainNavigation/>

        <main>{props.children}</main>
        {journalCtx.detailLog && <LogItemEditor journalCtx={journalCtx}/>}
        {notification && <Notification
            title={notification.title}
            message={notification.message}
            status={notification.status}
        />}

        <Footer/>
    </>
};
export default Layout;