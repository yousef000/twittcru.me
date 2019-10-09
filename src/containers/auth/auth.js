import React, {Component} from 'react';
import classes from './auth.module.css';
import * as actionCreators from '../../store/actions/actions';
import {connect} from 'react-redux';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as functions from '../../functions/functions';

class Auth extends Component {
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                console.log(this.props.history)
                return(
                    <div>
                        {this.props.onAddedSignedInUser(user.displayName, user.photoURL)}
                        {this.props.history.replace("/Karen")}
                    </div>
                )        
            }
            else{
                return(
                    <div>
                    </div>         
                )
            }
        
        })
    }
    render (){

        return (
            <div className={classes.Auth}>
                <StyledFirebaseAuth uiConfig={functions.uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddedSignedInUser: (userDisplayName, photoURL) => dispatch(actionCreators.ifUserInDatabase(userDisplayName, photoURL))
    }
}

export default connect(null, mapDispatchToProps)(Auth);