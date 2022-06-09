import {createContext, useEffect, useState} from "react";

const LanguageContext = createContext({
    languageText:'',
    setLanguage:()=>{}
});

export const LanguageContextProvider = props => {
        const [languageText, setLanguageText] = useState({});

        const setLanguage=(language)=>{
            if (language === 'zh') {
                setLanguageText({
                    logo: '子彈筆記',
                    buttonTask: '任務',
                    buttonEvent: '經驗',
                    buttonNotes: '註記',
                    buttonControlPast: '過去',
                    buttonControlFuture: '未來',
                    buttonControlTask: '任務',
                    buttonControlEdit: '編輯',
                    buttonControlOldNew: '舊>新',
                    buttonControlNewOld: '新>舊',
                    listForEver: '很久以後',
                    editLogsTitle: '編輯多則筆記',
                    editLogsDate: '執行日期',
                    editLogTag: '自定義標籤',
                    editLogsSave: '儲存',
                    editLogsDelete: '刪除',
                    editLogsCancel: '取消',
                    editLogTitle: '編輯筆記',
                    editLogContent: '內容',
                    authEmail: '電子信箱',
                    authPassword: '密碼',
                    authButtonSingUp: '註冊',
                    authButtonLogIn: '登入',
                    authButtonLogOut: '登出',
                    authCaptionSignUp: '註冊新帳號',
                    authCaptionLogIn: '已有帳號，我要登入'
                })
            }
            if (language === 'en') {
                setLanguageText({
                    logo: 'BulletNote',
                    buttonTask: 'Task',
                    buttonEvent: 'Event',
                    buttonNotes: 'Notes',
                    buttonControlPast: 'Past',
                    buttonControlFuture: 'Future',
                    buttonControlTask: 'Task',
                    buttonControlEdit: 'Edit',
                    buttonControlOldNew: 'Old>New',
                    buttonControlNewOld: 'New>Old',
                    listForEver: 'AFTER A LONG TIME',
                    editLogsTitle: 'Edit Multiple Notes',
                    editLogsDate: 'Date',
                    editLogTag: 'Custom Label',
                    editLogsSave: 'Save',
                    editLogsDelete: 'Delete',
                    editLogsCancel: 'Cancel',
                    editLogTitle: 'Edit Notes',
                    editLogContent: 'Contents',
                    authEmail: 'Email',
                    authPassword: 'Password',
                    authButtonSingUp: 'Sing Up',
                    authButtonLogIn: 'Sign In',
                    authButtonLogOut: 'Sign Out',
                    authCaptionSignUp: 'register new account',
                    authCaptionLogIn: 'I already have an account, I want to log in'
                })
            }
        }

        useEffect(()=>{
            setLanguage('zh');
        },[])


        return <LanguageContext.Provider value={{
            languageText, setLanguage
        }}>
            {props.children}
        </LanguageContext.Provider>
    }
;

export default LanguageContext;