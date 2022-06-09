import Logo from "./Logo";
import Link from "next/link";
import {useSession, signOut} from 'next-auth/client';
import classes from "./MainNavigation.module.css";
import Hashtag from "../icon/Hashtag";
import PencilAlt from "../icon/PencilAlt";
import {useContext} from "react";
import LanguageContext from "../../store/LanguageContext";
import Translate from "../icon/Translate";

const MainNavigation = () => {
    const [session, loading] = useSession();
    const {languageText,setLanguage} = useContext(LanguageContext);

    const logoutHandler=async ()=> {
        await signOut();
    }

    const transformHandler=()=>{
        if(languageText.logo==='子彈筆記'){
            setLanguage('en');
        }else{
            setLanguage('zh');
        }

    };

    return <header className={classes.header}>
        <Link href="/">
            <a>
                <Logo/>
            </a>
        </Link>
        <div className={classes.end}>
        <nav>
            <ul>{session &&
                <>
                    <li><Link href="/daily"><a className='button'><PencilAlt/></a></Link></li>
                    <li><Link href="/tags"><a className='button'><Hashtag/></a></Link></li>
                </>}
                <li>
                    <a className='button' onClick={transformHandler}><Translate/></a>
                </li>
            </ul>
        </nav>
        <nav>
            <ul>
                {session && <li>
                    <button onClick={logoutHandler}>{languageText.authButtonLogOut}</button>
                </li>}
                {!session && !loading &&
                    <li>
                        <Link href="/auth"><button>{languageText.authButtonLogIn}</button></Link>
                    </li>}
            </ul>
        </nav>
        </div>
    </header>
};
export default MainNavigation;