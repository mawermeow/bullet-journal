import {useState, useRef, useContext} from 'react';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import NotificationContext from "../../store/NotificationContext";

import classes from './AuthForm.module.css';
import Mail from "../icon/Mail";
import Key from "../icon/Key";

async function createUser(email, password) {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
    }

    return data;
}

function AuthForm() {
    const notificationCtx = useContext(NotificationContext);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    const switchAuthModeHandler=() =>{
        setIsLogin((prevState) => !prevState);
    }

    const submitHandler=async (event)=> {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        if (isLogin) {
            notificationCtx.showNotification({status:'render',title:'登入中',message:'正在確認您的資訊'});
            const result = await signIn('credentials', {
                redirect: false,
                email: enteredEmail,
                password: enteredPassword,
            });

            if (!result.error) {
                notificationCtx.showNotification({status:'success',title:'登入成功',message:'成功登入您的帳號！'});
                router.replace('/daily');
            }else{
                notificationCtx.showNotification({status:'error',title:'登入失敗',message:result.error});
            }
        } else {
            try {
                notificationCtx.showNotification({status:'render',title:'註冊中',message:'正在註冊您的帳號'});
                const result = await createUser(enteredEmail, enteredPassword);
                notificationCtx.showNotification({status:'success',title:'註冊成功',message:'帳號註冊完成！'});
                setIsLogin(true);
            } catch (error) {
                notificationCtx.showNotification({status:'error',title:'註冊失敗',message:error.message});
            }
        }
    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? '登入' : '註冊'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'><Mail/> 電子信箱</label>
                    <input type='email' id='email' required ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'><Key/> 密碼</label>
                    <input
                        type='password'
                        id='password'
                        required
                        ref={passwordInputRef}
                    />
                </div>
                <div className={classes.actions}>
                    <button>{isLogin ? '登入' : '註冊'}</button>
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? '註冊新帳號' : '已有帳號，我要登入'}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default AuthForm;