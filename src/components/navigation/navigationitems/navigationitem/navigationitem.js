import React from 'react';
import classes from './navigationitem.module.css'
import {Link} from 'react-router-dom';

const NavigationItem = (props) => {
    let navitem = <Link className={props.active ? classes.active : null} to={{
        pathname: props.link,
    }}>{props.children}</Link>

    if(props.children === "Logout"){
        navitem = <a onClick={props.logOutUser} className={props.active ? classes.active : null} href={props.link}>{props.children}</a>
    }
    if(props.children === "Login"){
        navitem = <a className={props.active ? classes.active : null} href={props.link
        }>{props.children}</a>
    }
    return (
        <li className={classes.NavigationItem}>
            {navitem}
        </li>
    )
   
}

export default NavigationItem;