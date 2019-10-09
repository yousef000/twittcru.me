import React, {Component} from 'react';
import classes from './displayComment.module.css';
import * as functions from '../../functions/functions';
import profilephoto from '../../assets/man.png';
import sendButton from '../../assets/sendbtn.png';
import { connect } from 'react-redux'; 
import * as actionCreators from '../../store/actions/actions';
import DisplayReply from '../displayReply/displayReply';
import retweetIcon from '../../assets/retweet.png'

class DisplayComment extends Component {
    state = {
        replyTextArea: "",
        replySendButton: "",
        tweetButton: "",
        reply: ""
    }
    shouldComponentUpdate(nextState){
        return this.state.replySendButton !== nextState.replySendButton
    }
    replyChangeHandler = (event) => {
        this.setState({reply: event.target.value})
    }
    replySentHandler = () => {
        this.props.onAddedReply(this.state.reply, this.props.pageUsername, this.props.comment)
        this.setState({replyTextArea: "", replySendButton: ""})
    }
    tweetWindow = (tweetURL) => {
        let top = window.innerWidth/2
        let left = window.innerHeight/2
        
        window.open(tweetURL, "window", 'toolbar=0,status=0,width=548,height=325, top=' + top + ',left=' + left)
    }
    writeAReply = () => {
        this.setState({
            replyTextArea: (<textarea 
                                className={classes.replyTextArea} 
                                onChange={this.replyChangeHandler} 
                                placeholder="Ask something!"></textarea>), 
            replySendButton: <input 
                                type="image" 
                                className={classes.replySendButton} 
                                onClick={this.replySentHandler} 
                                src={sendButton} alt="send" />, 
            tweetButton: ""})
    }
    render(){
        let replyButton = <p></p>
        let replyExist = false
        let tweetURL= "https://twitter.com/intent/tweet?text="
        let reply =
            <div>
                {[...this.props.replies].map(reply => {
                    if(reply.parent === this.props.comment){
                        replyExist = true
                        if(this.props.comment.length > 100){
                            if(reply.reply.length > 100){
                                tweetURL += this.props.comment.substring(0,100) + "... — " + reply.reply.substring(0,100) + "... &url=https://google.com/Yusuf"
                            }
                            else{
                                tweetURL += this.props.comment.substring(0,100) + "... — " + reply.reply + "&url=https://google.com/Yusuf"
                            }
                            
                        }
                        else{
                            if(reply.reply.length > 100){
                                tweetURL += this.props.comment + " — " + reply.reply.substring(0,100) + "... &url=https://google.com/Yusuf"
                            }
                            else{
                                tweetURL += this.props.comment + " — " + reply.reply + "&url=https://google.com/Yusuf";
                            }
                    
                        }
                        return(
                            <DisplayReply
                                key={Math.random()}
                                reply={reply.reply}
                                parent={reply.parent}
                                username={reply.username}
                                date={reply.date} 
                            />  
                        )
                    }
                    
                })}
            </div>
            
        
        if(this.state.replyTextArea === "" && replyExist === false && this.props.pageDisplayName === this.props.userDisplayName){
            replyButton = <input type="image" alt="replybtn" onClick={this.writeAReply} className={classes.replyButton} src={sendButton}></input>
        }
        else if(replyExist === true){
            this.state.tweetButton = 
                    <input type="image" src={retweetIcon} className={classes.tweetButton} onClick={() => this.tweetWindow(tweetURL)}></input>
        }
        return (
            <div className={classes.displayComment}>
                    <span><img className={classes.profileHeader} src={profilephoto} alt="IMG"></img></span>
                    <span className={classes.name}>{this.props.username}</span>
                    <span className={classes.dot}></span>
                    <span className={classes.crush}>{this.props.crushSen}</span>
                    <span className={classes.dot}></span>
                    <span className={classes.time}>{functions.timeSince(this.props.date)}</span>
                
                <p className={classes.comment}>{this.props.comment} </p>
                <span>{replyButton}</span>
                <span>{this.state.replyTextArea}</span>
                <span>{this.state.replySendButton}</span>
                <span>{reply}</span>
                <span>{this.state.tweetButton}</span>
            </div>
        )
    } 
}
const mapStateToProps = state => {
    return{
        replies: state.replies,
        pageDisplayName: state.pageDisplayName,
        userDisplayName: state.userDisplayName
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onAddedReply: (reply, username, comment) => dispatch(actionCreators.addReply(reply, username, comment))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DisplayComment);