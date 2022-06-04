import {createContext, useEffect, useState} from "react";

const NotificationContext = createContext({
    notification: null,
    showNotification: (notification) => {
    },
    hideNotification: () => {
    }
});

export const NotificationContextProvider = (props) => {
    const [notification, setNotification] = useState();

    useEffect(() => {
        if (notification && (
            notification.status === 'success'
            || notification.status === 'error'
        )) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000)
            return () => {
                clearTimeout(timer);
            }
        }
    }, [notification])

    const showNotification = (notification) => {
        setNotification(notification);
    };

    const hideNotification = () => {
        setNotification(null);
    };

    const context = {
        notification,
        showNotification,
        hideNotification
    };

    return <NotificationContext.Provider value={context}>
        {props.children}
    </NotificationContext.Provider>


}

export default NotificationContext;