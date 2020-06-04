import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace,Button} from 'antd-mobile'
import { Modal, WingBlank, Toast } from 'antd-mobile';
import { Brief } from 'antd-mobile/lib/list/ListItem'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'
const Item  = List.Item
class Personal extends Component {
  logout=()=>{

    Modal.alert('退出', '确定退出吗???', [
      { text: '取消' },
      { text: '确定', onPress: () => {
        Cookies.remove('userid')
        this.props.resetUser()

      } },
    ])
  }
  render() {
    const {username, type, header, company, post, salary, info} = this.props.user
    return (
     <div style={{marginTop: '50px'}}>
        <Result 
        img = {<img src = {require(`../../assets/images/${header}.png`)} alt="logo" />}
        title = {username}
        message = {company}
      />
      <List renderHeader = {()=>'相关信息'}>
        <Item multipleLine>
          <Brief>职位：{post}</Brief>
          <Brief>简介：{info}</Brief>
          {salary? <Brief>薪资：{salary}</Brief>:null}

        </Item>

      </List>
      <WhiteSpace></WhiteSpace>

        <Button type = "warning" onClick={this.logout}>退出登陆</Button>

      
     </div>
    )
  }
}
export default connect(
  state=>({user: state.user}),
  {resetUser}
)(Personal)
