import classes from "./TagHead.module.css";

const TagHead=(props)=>{
    const {tagName}=props;

    return <div className={classes.head}>
        <h2>{tagName}</h2>
    </div>
};
export default TagHead;