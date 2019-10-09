import React from 'react';
import classes from './displayReply.module.css';

const DisplayReply = (props) => {
    return(
        <div className={classes.displayReply}>
            <p className={classes.reply}>{props.reply} </p>
        </div>
    )
}
export default DisplayReply