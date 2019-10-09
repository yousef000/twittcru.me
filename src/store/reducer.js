import * as actionTypes from './actions/actions';
import { stat } from 'fs';

const initialState = {
    comments: [],
    replies: [],
    loading: true,
    crush: false,
    noComments: false,
    noUser: false,
    mutualCrushes: [],
    userDisplayName: "",
    pageDisplayName: "",
    userPhotoURL: "",
    pagePhotoURL: "",
    numberOfCrushes: 0
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_COMMENT:
            return{
                ...state,
                comments: state.comments.concat({username: action.username, comment: action.comment, isMutualCrush: action.isMutualCrush, date: Date()}),
                noComments: false
            }
        case actionTypes.INIT_COMMENTS:
            return{
                ...state,
                comments: state.comments.concat(action.comments),
                loading: false,
                pageDisplayName: action.pageDisplayName,
                pagePhotoURL: action.photoURL,
                numberOfCrushes: action.comments.length
            }
        case actionTypes.INIT_MUTUAL_CRUSHES:
            return{
                ...state,
                mutualCrush: state.mutualCrush.concat({
                    userOne: action.userOne, 
                    userTwo: action.userTwo
                })
            }
        case actionTypes.HAVE_A_CRUSH:
            return{
                ...state,
                crush: true
            }
        case actionTypes.NO_COMMENTS:
            return{
                ...state,
                loading: false,
                noComments: true,
                pageDisplayName: action.pageDisplayName,
                pagePhotoURL: action.photoURL
            }
        case actionTypes.NO_USER:
            return{
                ...state,
                loading: false,
                noUser: true
            }
        case actionTypes.MUTUAL_CRUSH:
            return{
                ...state,
                mutualCrush: state.mutualCrush.concat({
                    userOne: action.userOne, 
                    userTwo: action.userTwo
                })
            }
        case actionTypes.ADD_SIGNED_IN_USER:
            return{
                ...state,
                userDisplayName: action.userDisplayName,
                photoURL: action.photoURL
            }
        case actionTypes.LOG_OUT_USER:
            return{
                ...state,
                userDisplayName: ""
            }
        case actionTypes.ADD_REPLY:
            return{
                ...state,
                replies: state.replies.concat({
                    reply: action.reply,
                    username: action.username,
                    parent: action.parent,
                    date: Date()
                }) 
            }
        case actionTypes.INIT_REPLIES:
            return{
                ...state,
                replies: state.replies.concat(action.reply) 
            }
        default:
            return state;
    }
}

export default reducer;