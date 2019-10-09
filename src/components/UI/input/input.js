import React from 'react';
import classes from './input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement]
    let validationError = null;
    if(props.invalid && props.touched){
        validationError = <p>Please enter a valid {props.valueType}</p>
    }
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }
    switch (props.elementType){
        case( 'input' ):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed}/>
            break;
        case( 'textarea' ):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>
            break;
        case( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')} 
                    value={props.value}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} 
                                value={option.value}
                                onChange={props.changed}>
                                {option.displayValue}
                        </option>
                    ))}
                </select>
            )
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}/>
        
    }
    return (
        <div className={classes.Input}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
    
}

export default input;