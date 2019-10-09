import React from 'react';
import classes from './navbar.module.css';
import Logo from '../../logo/logo';
import NavigationItems from '../navigationitems/navigationitems';
import DrawerToggle from '../sidedrawer/drawertoggle/drawertoggle';

const Navbar = (props) => ( 
    
    <header className={classes.Navbar}>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav>
            <NavigationItems logOutUser={props.logOutUser} isLoggedIn={props.isLoggedIn}/>
        </nav>
    </header>
)

export default Navbar;