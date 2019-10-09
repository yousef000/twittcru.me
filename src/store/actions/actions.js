import axios from '../../axios-orders';
import firebase from 'firebase';

export const ADD_COMMENT = 'ADD_COMMENT';
export const INIT_COMMENTS = 'INIT_COMMENTS';
export const INIT_MUTUAL_CRUSHES = 'INIT_MUTUAL_CRUSHES';
export const ADD_REPLY = 'ADD_REPLY'
export const INIT_REPLIES = 'INIT_REPLIES'
export const HAVE_A_CRUSH = 'HAVE_A_CRUSH';
export const NO_COMMENTS = 'NO_COMMENTS';
export const MUTUAL_CRUSH = "MUTUAL_CRUSH";

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const ADD_SIGNED_IN_USER = 'ADD_SIGNED_IN_USER';
export const LOG_OUT_USER = 'LOG_OUT_USER';
export const NO_USER = 'NO_USER';

export const noUser = () => {
    return{
        type: NO_USER
    }
}
export const noComments = (parent, photoURL) => {
    return {
        type: NO_COMMENTS,
        pageDisplayName: parent,
        photoURL: photoURL
    }
}
export const haveACrush = () => {
    return{
        type: HAVE_A_CRUSH
    }
}
export const mutualCrush = (username, parent) => {
    axios.push('mutualcrushes.json', {
        userOne: username,
        userTwo: parent
    })
    .then(res => {
        console.log(res)
    })
    return {
        type: MUTUAL_CRUSH,
        userOne: username,
        userTwo: parent
    }
}
export const saveComments = (comments, parent, photoURL) => {
    return {
        type: INIT_COMMENTS,
        comments: comments,
        pageDisplayName: parent,
        photoURL: photoURL
    }
}
export const saveMutualCrush = (userOne, userTwo) =>{
    return{
        type: INIT_MUTUAL_CRUSHES,
        userOne: userOne,
        userTwo: userTwo
    }
}
export const initMutualCrushes = (parent) => {
    return dispatch => {
        axios.get('mutualcrushes.json')
        .then(response => {
            if(response.data != null){
                Object.keys(response.data).map(i => {
                    if(response.data[i].userOne === parent || response.data[i].userTwo === parent){
                        dispatch(saveMutualCrush(response.data[i].userOne, response.data[i].userTwo))
                    }
                })
            }
        })
    }
    
}
export const initComments = (parent, photoURL) => {
    return dispatch => {
        axios.get('/comments.json')
        .then(res => {
            let comments = [];

            if(res.data != null){
                Object.keys(res.data).map(comment => {
                    if(res.data[comment].parent === parent){
                        comments.push(res.data[comment])
                    }
                })
                if(comments.length !== 0){
                    dispatch(saveComments(comments, parent, photoURL))
                }
                else{
                    dispatch(noComments(parent, photoURL))
                }
                
            }
        })
        
    }
    
}
export const findUser = (parent) => {
    return dispatch => {
        let no_User = true;
        let photoURL = "";
        axios.get('/users.json')
        .then(res => {
            if(res.data != null){
                Object.keys(res.data).map(user => {
                    if(res.data[user].name === parent){
                        no_User = false
                        photoURL = res.data[user].photoURL
                    }
                })
            }
            if(no_User){
                dispatch(noUser())
                dispatch(noComments())
            }
            else{
                dispatch(initComments(parent, photoURL))
                dispatch(initMutualCrushes(parent))
            }
            
        })

        
    }
}
export const saveInitReply = (reply) => {
    return {
        type: INIT_REPLIES,
        reply: reply
    }
}
export const initReplies = (parent) => {
    return dispatch => {
        axios.get('/replies.json')
        .then(res => {
            if(res.data != null){
                let reply = {}
                Object.keys(res.data).map(reply => {
                    if(res.data[reply].parent === parent){
                        reply = {
                            parent: res.data[reply].parent,
                            reply: res.data[reply].reply,
                            username: res.data[reply].username,
                            date: res.data[reply].date
                        }
                        dispatch(saveInitReply(reply))
                    }
                })
                
            }
        })
        
    }
}
export const saveReply = (reply, username, comment) => {
    return{
        type: ADD_REPLY,
        reply: reply,
        parent: comment,
        username: username
    }
}
export const addReply = (reply, username, comment) => {
    return dispatch => {
        axios.post('replies.json', {
            parent: comment,
            username: username,
            reply: reply,
            date: Date.now()
        })
        .then(response => {
            dispatch(saveReply(reply, username, comment))
        })
    }
}
export const saveComment = (comment, username, isMutualCrush) => {
    return {
        type: ADD_COMMENT,
        comment: comment,
        username: username,
        isMutualCrush: isMutualCrush
    }
}
export const addComment = (comment, parent, username, isMutualCrush) => {
    return dispatch => {
        axios.post('/comments.json', {
            id: Math.random(),
            parent: parent,
            comment: comment,
            username: username,
            isMutualCrush: isMutualCrush,
            date: Date.now()
        })
        dispatch(saveComment(comment, username, isMutualCrush));
    }
}
export const isMutualCrush = (comment, parent, username) => {
    let isMutualCrush = false;
    return dispatch => {
        axios.get('/comments.json')
        .then(response => {
            if(response.data != null){
                Object.keys(response.data).map(i => {
                    if(response.data[i].parent === username && response.data[i].username === parent){
                        console.log("YOU BOTH HAVE A CRUSH")
                        isMutualCrush = true;
                        dispatch(mutualCrush(parent, username));
                    }
                    
                })
            }
            dispatch(addComment(comment, parent, username, isMutualCrush))
        })
      
    }
    
    
}
export const logOutUser = () => {
    firebase.auth().signOut()
    return{
        type: LOG_OUT_USER
    }
}
export const saveSignedInUser = (userDisplayName, photoURL) => {
    return{
        type: ADD_SIGNED_IN_USER,
        userDisplayName: userDisplayName,
        photoURL: photoURL
    }
}
export const addSignedInUser = (userDisplayName, photoURL) => {
    return dispatch => {
        axios.post('/users.json', {
            name: userDisplayName,
            photoURL: photoURL
        })
        .catch(err => {

        })
        dispatch(saveSignedInUser(userDisplayName, photoURL));
    }
    
    
}
export const ifUserInDatabase = (userDisplayName, photoURL) => {
    return dispatch => {
        let alreadyInDatabase = false;
        axios.get('/users.json')
        .then(response => {
            if(response.data != null){
                Object.keys(response.data).map(user => {
                    if(response.data[user].name === userDisplayName){
                        alreadyInDatabase = true;
                    }
                })
            }
            
            if(alreadyInDatabase === false){
                dispatch(addSignedInUser(userDisplayName, photoURL))
            }
            else{
                dispatch(saveSignedInUser(userDisplayName, photoURL))
            }
        })  

    }
    
}
