import Logo from "./Logo";
import Link from "next/link";
import {useSession, signOut} from 'next-auth/client';
import classes from "./MainNavigation.module.css";
import Hashtag from "../icon/Hashtag";
import PencilAlt from "../icon/PencilAlt";

const MainNavigation = () => {
    const [session, loading] = useSession();

    const logoutHandler=async ()=> {
        await signOut();
    }

    return <header className={classes.header}>
        <Link href="/">
            <a>
                <Logo/>
            </a>
        </Link>
        <nav>
            <ul>{session &&
                <>
                    <li><Link href="/daily"><a className='button'><PencilAlt/></a></Link></li>
                    <li><Link href="/tags"><a className='button'><Hashtag/></a></Link></li>
                    <li>
                        <button onClick={logoutHandler}>登出</button>
                    </li>
                </>}
                {!session && !loading && <li>
                    <Link href="/auth"><button>登入</button></Link>
                </li>}
            </ul>
        </nav>
    </header>
};
export default MainNavigation;