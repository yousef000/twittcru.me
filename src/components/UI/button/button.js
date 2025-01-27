import React from 'react';
import classes from './button.module.css';

const Button = (props) => (
    <button 
        disabled={props.disabled}
        className={[classes.Button, 
        classes[props.btnType]].join(' ')} 
        onClick={props.clicked}>{props.children}
    </button>
)

export default Button;