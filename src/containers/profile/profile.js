import React, { Component } from 'react';
import { connect } from 'react-redux';
import DisplayComment from '../../components/displayComment/displayComment'
import * as actionCreators from '../../store/actions/actions';
import classes from './profile.module.css';
import Modal from '../../components/UI/modal/modal';
import Navbar from '../../components/navigation/navbar/navbar';
import SideDrawer from '../../components/navigation/sidedrawer/sidedrawer';
import Spinner from '../../components/UI/spinner/spinner';
import altProfilePhoto from '../../assets/man.png';
import {Helmet} from "react-helmet";

class Profile extends Component {
    state = {
        comment: '',
        showSideDrawer: false,
        commentSent: false
    }
    componentDidMount(){
        this.props.onInitComments(this.props.history.location.pathname.replace("/", ''));
    }
    commentChangeHandler = (event) => {
        this.setState({comment: event.target.value});
    }
    sideDrawerClosedHanlder = () => {
        this.setState({showSideDrawer: false})
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }
    commentSentHandler = () => {
        this.props.onAddedComment(this.state.comment, 
            this.props.pageDisplayName, this.props.userDisplayName)
        this.setState({commentSent: true})
    }
    haveACrushHandler = () => {
        this.props.onHaveACrush()
        this.setState({commentSent: false})
    }

    render(){ 
        let comments = <p></p>;
        let body = <Spinner />;
        let writeAHint = <p></p>
        let mutualCrushModal = <p></p>
        let crushButton = <p></p>
        let profileInfo = <p></p>
        let profilePhoto = this.props.pagePhotoURL.replace("_normal", "")

        if(this.props.isMutualCrush){
            mutualCrushModal = (<Modal parent={this.props.history.location.pathname.replace("/", '')}></Modal>)
        }
        if(!this.props.loading && this.props.noComments === false){
            let username = "Anon";
            let crushSen = "has a crush";

            comments = (
                <div>
                    {[...this.props.comments].reverse().map(comment => {
                    if(comment.isMutualCrush){
                        username = comment.username;
                        crushSen = "has a mutual crash";
                    }
                    this.props.onInitReplies(comment.comment)
                    return(
                        <DisplayComment 
                            key={Math.random()} 
                            username={username} 
                            comment={comment.comment}
                            crushSen={crushSen} 
                            date={comment.date}
                            id={comment.id}
                            pageUsername={comment.parent}
                        />
                    )
            
            
                    })}
                </div>
                )
                body = <p></p>
        }
        else if(!this.props.loading && this.props.noUser){
            body = <p>No user found</p>
        }
        else if(!this.props.loading && this.props.noComments){
            body = <p> No comments yet </p>
        }
        if(!this.props.loading && !this.props.noUser){
            profileInfo = 
                <div className={classes.profileInfo}>
                    <img className={classes.profileHeader} src={profilePhoto} alt={altProfilePhoto} border="0" width="259" height="55"/>
                    <p className={classes.userDisplayName}>{this.props.pageDisplayName}</p> 
                    <p className={classes.numberOfCrushes}><strong>{"CRUSHES: " + this.props.numberOfCrushes}</strong></p>
                </div>
        }
        if(this.props.userDisplayName !== "" && (this.props.userDisplayName !== this.props.pageDisplayName)){
            crushButton =  
                <div>
                    <p><strong>Have a crush?</strong></p>
                    <button onClick={this.haveACrushHandler}>YES!</button>
                </div>
        }
        if(this.props.haveACrush && this.state.commentSent === false){
                writeAHint = (
                    <div>
                        <p className={classes.p}>You will be anonymous untill it's a mutual crush. 
                            Then both of you will be notified. Warning! You can't undo your crush</p>
                        <textarea className={classes.textarea}
                                  placeholder="Give a hint of who you are ;)"
                                  onChange={this.commentChangeHandler}
                                  value={this.state.comment}></textarea>
                        {console.log(this.props.pageDisplayName, this.props.userDisplayName, this.state.comment)}
                        <button className={classes.send}
                        onClick={this.commentSentHandler}>
                        SEND</button>
                    </div>
                )

           
             
        }
        return(
            <div className={classes.profile}>
                <Helmet>
                    <title>Profile</title>
                    <meta property="twitter:card" content="summary" />
                    <meta name="twitter:site" content="@yusdost" />
                    <meta name="twitter:title" content="Small Island Developing States Photo Submission" />
                    <meta name="twitter:description" content="View the album on Flickr." />
                    <meta name="twitter:image" content={altProfilePhoto} />
                    <meta name="twitter:creator" content="@yusdost" />
                </Helmet>

                <Navbar logOutUser={this.props.onLoggedOutUser} isLoggedIn={this.props.userDisplayName} drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer logOutUser={this.props.onLoggedOutUser} isLoggedIn={this.props.userDisplayName} open={this.state.showSideDrawer}
                            closed={this.sideDrawerClosedHanlder}/>
                {mutualCrushModal}
                {profileInfo}
                {crushButton}
                {body}
                {writeAHint}                                                                                                                                                    
                {comments}       
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        comments: state.comments,
        loading: state.loading,
        haveACrush: state.crush,
        noComments: state.noComments,
        noUser: state.noUser,
        isMutualCrush: state.isMutualCrush,
        userDisplayName: state.userDisplayName,
        pageDisplayName: state.pageDisplayName,
        userPhotoURL: state.userPhotoURL,
        pagePhotoURL: state.pagePhotoURL,
        numberOfCrushes: state.numberOfCrushes
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onInitComments: (parent) => dispatch(actionCreators.findUser(parent)),
        onAddedComment: (comment, parent, username) => dispatch(actionCreators.isMutualCrush(comment, parent, username)),
        onInitReplies: (comment) => dispatch(actionCreators.initReplies(comment)),
        onHaveACrush: () => dispatch(actionCreators.haveACrush()),
        onLoggedOutUser: () => dispatch(actionCreators.logOutUser())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);