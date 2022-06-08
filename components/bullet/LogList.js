import classes from "./LogList.module.css";
import LogItem from "./LogItem";

const LogList = (props) => {

    const {items, dateTitle,editMode,setEditMode} = props;
    const isToday = dateTitle.includes('✩');

    return <div className={isToday ? classes.today : ''}>
        <div className={classes.bullet}>
            <h2>{dateTitle}</h2>
            <ul>
                {items && items.length > 0 && items.map(item => <LogItem
                    key={item.id}
                    item={item}
                    editMode={editMode}
                    setEditMode={setEditMode}
                />)}
            </ul>
        </div>
    </div>
}

export default LogList;