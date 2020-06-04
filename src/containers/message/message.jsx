import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getLastMsgs} from '../../utils/getLastMsgs'
import {List, Badge} from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief



class Message extends Component {
  render() {
    // const {user} = this.props
    // const {users, chatMsgs} = this.props.chat
    // const lastMasgs = getLastMsgs(chatMsgs)
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat

    // 对chatMsgs按chat_id进行分组
    const lastMsgs = getLastMsgs(chatMsgs, user._id)

    
  
    return (
      <List style ={{marginTop: '50px', marginBottom: '50px'}}>
       {
          lastMsgs.map(msg =>{
            // 得到目标用户的id
            const targetUserId = msg.to===user._id ? msg.from : msg.to
            // 得到目标用户的信息
            const targetUser = users[targetUserId]
            return (
              <Item
                key={msg._id}
                extra={<Badge text={msg.unReadCount}/>}
                thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`) : null}
                arrow='horizontal'
                onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
              >
                {msg.content}
                <Brief>{targetUser.username}</Brief>
              </Item>
            )
          })
        }
      </List>
    )
  }
}
export default connect(
  state=>({user: state.user, chat: state.chat}),
  {}
)(Message)
