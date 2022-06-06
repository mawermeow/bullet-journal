import classes from "./TagItem.module.css";
import Link from "next/link";

const TagItem=(props)=>{
    const {tag}= props;
    const linkPath = `/tags/${tag}`;

    return <Link href={linkPath}>
        <div className={classes.tag}>
            <div className={classes.content}>
                <h3>{tag}</h3>
            </div>
        </div>


    </Link>

};
export default TagItem;