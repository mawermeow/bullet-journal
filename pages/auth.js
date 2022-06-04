import Head from 'next/head';
import AuthForm from "../components/auth/AuthForm";
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';

const AuthPage=()=>{
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        getSession().then((session) => {
            if (session) {
                router.replace('/daily');
            } else {
                setIsLoading(false);
            }
        });
    }, [router]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return <>
        <Head>
            <meta name="description" content="登入以使用線上子彈筆記"/>
        </Head>
        <AuthForm/>
    </>;

};
export default AuthPage;