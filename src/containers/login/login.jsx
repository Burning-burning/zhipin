import React, { Component } from 'react'
import Logo from '../../components/logo/logo'
import {connect} from 'react-redux'
import {login} from '../../redux/actions'
import {Redirect} from 'react-router-dom'
import '../../assets/css/index.less'
import {List, Button, InputItem, WhiteSpace, WingBlank,NavBar} from 'antd-mobile'
class Login extends Component {
  state = {
    username: '',
    password: '',
  }
  login=()=>{
    const {username, password} = this.state
    this.props.login(username, password)
  }
  register=()=>{
    this.props.history.replace('/register')
  }
  handleChange=(name, val)=>{
    this.setState({
      [name]:val,
    })
  }
  render() {
    const {msg, redirectTo} = this.props.user
    if(redirectTo){
      return <Redirect to={redirectTo}></Redirect>
    }
    return (
      <List>
        <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
        <Logo />
        <WingBlank>
          {msg?<div className='error-msg'>{msg}</div>:null}
          <WhiteSpace></WhiteSpace>
          <InputItem onChange={(val)=>this.handleChange('username',val)}>用户名：</InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem onChange={(val)=>this.handleChange('password',val)} type='password'>密&nbsp;&nbsp;&nbsp;码：</InputItem>
          <WhiteSpace></WhiteSpace>
          <Button type='primary' onClick={this.login}>登陆</Button>
          <WhiteSpace></WhiteSpace>
          <Button onClick={this.register}>还没有账户</Button>
        </WingBlank>

      </List>
    )
  }
}


export default connect(
  state => ({user: state.user}),
  {login}
)(Login)