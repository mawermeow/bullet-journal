import classes from "./AddLogForm_TagHead.module.css";

const AddLogForm_TagHead=(props)=>{
    const {tagName}=props;

    return <div className={classes.head}>
        <h2>{tagName}</h2>
    </div>
};
export default AddLogForm_TagHead;