import {
  reqLogin,
  reqRegister,
  reqUpdateUser,
  reqUser,
  reqUserList, 
  reqChatMsgList,
  reqReadMsg
} from '../api'
import io from 'socket.io-client'
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
function initIO(dispatch, userid){
  if(!io.socket){
    io.socket = io("ws://localhost:4000")
    io.socket.on('receiveMsg', function(chatMsg){
      console.log("客户端接收服务器发送的消息", chatMsg)
  
      if(userid===chatMsg.from || userid===chatMsg.to) {
        dispatch(receiveMsg(chatMsg, userid))
      }  })
  }
}
export const msgRead = ({from, to, count})=>({type:MSG_READ, data:{from, to, count} })
export const readMsg=(userid,targetId)=>{
  return async dispatch =>{
    const response = await reqReadMsg(targetId)
    const result = response.data
    if(result.code===0){
      const count = result.data
      const from = targetId
      const to = userid
      dispatch(msgRead({from, to, count}))
    }
  }
}
async function getMsgList (dispatch,userid){
  initIO(dispatch, userid)
  const response = await reqChatMsgList()
  const result = response.data
  if(result.code===0){
    const {users, chatMsgs} = result.data
    dispatch(receiveMagList({users, chatMsgs, userid}))
    

  }
}


export const sendMsg = ({from, to, content}) => {
  return dispatch => {
    console.log("客户端向服务器发消息",{from, to, content})
    
    
    io.socket.emit('sendMsg', {from, to, content})

  }
}

export const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
export const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
export const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
export const receiveUserList = (userList)=>({type: RECEIVE_USERLIST, data: userList})
export const receiveMagList = ({users, chatMsgs, userid})=>({type: RECEIVE_MAG_LIST, data: {users, chatMsgs, userid}})
export const receiveMsg = (chatMsg, userid)=>({type:RECEIVE_MSG, data: {chatMsg, userid}})
export const register = (user) => {
  const {username, password, password2, type} = user
  if(password!==password2){
    return errorMsg('两次密码要一致')
  }else if(!username){
    return errorMsg('用户名必须指定')
  }
  return async dispatch => {
    const response = await reqRegister({username, password, type})
    const result = response.data
    if(result.code===0){
      getMsgList(dispatch, result.data._id)
      dispatch(authSuccess(result.data))
    }else{
      dispatch(errorMsg(result.msg))
    }
  }
}

export const login = (username, password)=>{
  if(!password){
    return errorMsg('密码必须指定')
  }else if(!username){
    return errorMsg('用户名必须指定')
  }
  return async dispatch=>{
    const response = await reqLogin(username, password)
    const result = response.data
    if(result.code===0){
      getMsgList(dispatch, result.data._id)
      dispatch(authSuccess(result.data))
    }else{
      dispatch(errorMsg(result.msg))
    }
  }
}

export const updateUser = (user)=>{
  return async dispatch=>{
    const response = await reqUpdateUser(user)
    const result = response.data
    if(result.code===0){
      dispatch(receiveUser(result.data))
    }else{
      dispatch(resetUser(result.msg))
    }
  }
}


export const getUser = () => {
  return async dispatch => {
    const response = await reqUser()
    const result = response.data
    if(result.code===0){
      getMsgList(dispatch, result.data._id)
      dispatch(receiveUser(result.data))
    }else{
      dispatch(resetUser(result.msg))

    }
  }
}

 

export const getUserList = (type)=>{
  return async dispatch=>{
    const response = await reqUserList(type)
    const result = response.data
    console.log("response",response)
    if(result.code===0){
      dispatch(receiveUserList(result.data))
    }
  }
}


