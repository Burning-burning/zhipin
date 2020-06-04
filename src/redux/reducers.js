
import {combineReducers} from 'redux'
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USERLIST,
  RECEIVE_MAG_LIST,
  RECEIVE_MSG,
  MSG_READ
} from './action-types'
import {redirectTo} from '../utils/index'
const initUser = {
  username: '',
  type: '',
  msg: '',
  redirectTo:''
}

function user(state = initUser, action){
  switch(action.type){
    case AUTH_SUCCESS:
      const {type, header} = action.data
      return {...action.data, redirectTo: redirectTo(type,header)}
    case ERROR_MSG:
      return {...state, msg: action.data}
    case RECEIVE_USER:
      return action.data
    case RESET_USER:
      return {...initUser, msg:action.data}


    default:
      return state
  }
}

const initUserList = []
function userList(state=initUserList, action){
  switch(action.type){
    case RECEIVE_USERLIST:
      return action.data
    default:
      return state
  }
}
const initChat={
  users:{}, 
  chatMsgs: [],
  unReadCount: 0,

}
function chat (state = initChat,action){
  switch(action.type){
    case RECEIVE_MAG_LIST:
      const {users, chatMsgs, userid} = action.data
      return {
        users,
        chatMsgs,
        unReadCount:chatMsgs.reduce((preTotal, msg)=>preTotal+(!msg.read&&userid===msg.to?1:0),0)
      }
      case RECEIVE_MSG: // data: chatMsg
      const {chatMsg} = action.data
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
        unReadCount: state.unReadCount+(!chatMsg.read&&action.data.userid===chatMsg.to?1:0)
      }
      case MSG_READ:
        const {from, to, count} = action.data
        return {
          users: state.users,
          chatMsgs: state.chatMsgs.map(msg=>{
            if(msg.from===from&&msg.to===to&&!msg.read){
              return {...msg, read:true}

            }else{
              return msg
            }
          }),
          unReadCount: state.unReadCount-count
        }
 
    default:
      return state
  }

}

export default combineReducers({
  user,
  userList,
  chat
})