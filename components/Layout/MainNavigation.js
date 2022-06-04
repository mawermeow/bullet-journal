import Logo from "./Logo";
import Link from "next/link";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
    return <header className={classes.header}>
        <Link href="/">
            <a>
                <Logo/>
            </a>
        </Link>
        <nav>
            <ul>
                <li><Link href="/daily">日</Link></li>
                <li><Link href="/weekly">週</Link></li>
                <li><Link href="/monthly">月</Link></li>
                <li><Link href="/yearly">年</Link></li>
            </ul>
        </nav>
    </header>
};
export default MainNavigation;