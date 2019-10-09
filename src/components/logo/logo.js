import React from 'react';
import logo from '../../assets/burger-logo.png'
import classes from './logo.module.css'
const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={logo} alt="logo" />
    </div>
)
export default Logo;