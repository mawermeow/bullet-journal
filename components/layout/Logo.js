import classes from "./Logo.module.css";
import {useContext} from "react";
import LanguageContext from "../../store/LanguageContext";

const Logo=()=>{
    const {languageText} = useContext(LanguageContext);
    return <div className={classes.logo}>{languageText.logo}</div>
};
export default Logo;