import React from 'react';
import classes from './navigationitems.module.css'
import NavigationItem from './navigationitem/navigationitem'

const NavigationItems = (props) => {
        let navitem = (<NavigationItem link="/">Login</NavigationItem>)
        if(props.isLoggedIn !== ""){
            navitem = (<NavigationItem logOutUser={props.logOutUser} link="/">Logout</NavigationItem>)
        }
        return(
            <div>
                <ul className={classes.NavigationItems}>
                    <NavigationItem link="/" active>Profile</NavigationItem>
                    {navitem}
                </ul>
            </div>
        )

    }

    

export default NavigationItems;