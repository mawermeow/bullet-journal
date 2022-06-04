import MainNavigation from "./MainNavigation";
import NotificationContext from "../../store/NotificationContext";
import {useContext} from "react";
import Notification from "../ui/Notification";

const Layout=(props)=>{
    const notificationCtx=useContext(NotificationContext);
    const notification = notificationCtx.notification;

    return <>
        <MainNavigation/>
        <main>{props.children}</main>
        {notification && <Notification
            title={notification.title}
            message={notification.message}
            status={notification.status}
        />}
    </>
};
export default Layout;