import Head from 'next/head';
import AuthForm from "../components/auth/AuthForm";
import {useRouter} from 'next/router';
import {getSession} from 'next-auth/client';
import {useEffect, useState} from 'react';
import LoadingSpinner from "../components/ui/LoadingSpinner";

const AuthPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        getSession().then((session) => {
            if (session) {
                router.replace('/');
            } else {
                setIsLoading(false);
            }
        });
    }, [router]);

    if (isLoading) {
        return <div className="center">
            <LoadingSpinner/>
        </div>
    }

    return <>
        <Head>
            <title>登入頁面 - Login Page</title>
            <meta name="description" content="免費申請帳號&登入，即可馬上開始使用線上子彈筆記！"/>
        </Head>
        <AuthForm/>
    </>;

};
export default AuthPage;