import React from 'react';
import Logo from '../../logo/logo';
import NavigationItems from '../navigationitems/navigationitems';
import classes from './sidedrawer.module.css';
import Backdrop from '../../UI/backdrop/backdrop';

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return(
        <div>
            <Backdrop show={props.open} clicked={props.closed}/>
                <div className={attachedClasses.join(' ')}>
                    <div className={classes.Logo}>
                        <Logo />
                    </div>
                    <nav>
                        <NavigationItems logOutUser={props.logOutUser} isLoggedIn={props.isLoggedIn}/>
                    </nav>
                </div>
        </div>
        
    ) 
}

export default SideDrawer;