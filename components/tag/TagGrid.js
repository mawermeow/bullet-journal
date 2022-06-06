import classes from "./TagGrid.module.css";
import TagItem from "./TagItem";

const TagGrid=(props)=>{
    return <ul className={classes.grid}>
        {props.tags.map(tag=><TagItem key={tag} tag={tag}/>)}
    </ul>
};

export default TagGrid;