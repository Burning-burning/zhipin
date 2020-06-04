import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile'
import {sendMsg, readMsg} from '../../redux/actions'
import QueueAnim from 'rc-queue-anim'
import './chat.less'

const Item = List.Item
class Chat extends Component {
  state = {
    content: '',
    isShow: false,

  }
  componentWillMount(){
    const emojis=['😀', '😃','😁','😆', '🙂','😀', '😃','😁','😆', '🙂','😀', '😃','😁','😆', '🙂','😀', '😃','😁','😆', '🙂','😀', '😃','😁','😆', '🙂','😀', '😃','😁','😆', '🙂','😀', '😃','😁','😆', '🙂','😀', '😃','😁','😆', '🙂','😀', '😃','😁','😆', '🙂','😀', '😃','😁','😆', '🙂','😀', '😃','😁','😆', '🙂','😀', '😃','😁','😆', '🙂',]
    this.emojis = emojis.map(emoji=>({text: emoji}))
  }
  send=()=>{
    const from = this.props.user._id
    const to = this.props.match.params.id
    const content = this.state.content
    if(content){
      this.props.sendMsg({from, to, content})
    }
    this.setState({content:'',isShow: false})
  }
  toggle=()=>{
    const isShow = !this.state.isShow

    this.setState({
      isShow
    })

    if(isShow){
      setTimeout(()=>{
        window.dispatchEvent(new Event('resize'))
      },0)
    }
  }
  componentDidMount(){
    window.scrollTo(0, document.body.scrollHeight)
    
  }
  componentDidUpdate(){
    window.scrollTo(0, document.body.scrollHeight)
  }

  componentWillUnmount(){
    this.props.readMsg(this.props.user._id,this.props.match.params.id)
  }
  render() {
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat

    // 计算当前聊天的chatId
    const meId = user._id
    if(!users[meId]) { // 如果还没有获取数据, 直接不做任何显示
      return null
    }
    const targetId = this.props.match.params.id
    const chatId = [meId, targetId].sort().join('_')
    console.log(chatMsgs)

    // 对chatMsgs进行过滤
    const msgs = chatMsgs.filter(msg => msg.chat_id===chatId)

    // 得到目标用户的header图片对象
    const targetHeader = users[targetId].header
    const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null

    return (
      <div id='chat-page'>
        <NavBar icon={<Icon type="left" ></Icon>} onLeftClick={()=>this.props.history.goBack()} style={{width: '100%', zIndex: '10', position: 'fixed', top:0}}>{users[targetId].username}</NavBar>
        <List style = {{marginTop: '50px', marginBottom: '50px'}}>
         <QueueAnim type='alpha' >
         {
            msgs.map(msg=>{
              if(msg.from === targetId){
                return <Item
                key = {msg._id}
                thumb={targetIcon}
              >{msg.content}</Item>

              }else{

                return (
                  <Item
                  key={msg._id}
                  className = 'chat-me'
                  extra='我'
                >{msg.content}</Item>
                )
              }
            })
          }
         </QueueAnim>
          
         
        </List>
        <div className='am-tab-bar'> <InputItem value={this.state.content}
        onFocus={()=>this.setState({isShow: false})}
          placeholder="请输入" onChange={(val)=>this.setState({content: val})} extra={
           <span> <span onClick={this.toggle}>😀</span>
           <span onClick={this.send}>发送</span></span> }
          /> 
          {
            this.state.isShow?(<Grid
              data={this.emojis}
              columnNum={8}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={(item)=>this.setState({content: this.state.content+item.text})}
            ></Grid>): null
          }
          </div>
        </div>
    )
  }
}


export default connect(
  state=>({user: state.user, chat: state.chat}),
  {sendMsg, readMsg}
)(Chat)
