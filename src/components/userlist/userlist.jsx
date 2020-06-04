import React, { Component } from 'react'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
class UserList extends Component {
  static  propTypes = {
    userList: PropTypes.array.isRequired
  }
  render() {
    const userList = this.props.userList
    console.log("userList",this.props.userList)
    return (

      <WingBlank style={{marginBottom: '50px', marginTop: '50px'}}>
        <WhiteSpace></WhiteSpace>
       <QueueAnim type="scale">
       {
          userList.map(user=>(
            <Card onClick={()=>this.props.history.push(`/chat/${user._id}`)}>
              <Card.Header
                thumb = {user.header ?require(`../../assets/images/${user.header}.png`):null}
                extra={user.username}
              />
              <Card.Body>
                <div>职位：{user.post}</div>
                {user.company?<div>公司：{user.company}</div>:null}
                {user.salary?<div>月薪：{user.salary}</div>:null}
                <div>描述：{user.info}</div>
              </Card.Body>
             
            </Card>
          ))
        }
       </QueueAnim>
      </WingBlank>
    )
  }
}
export default withRouter(UserList)