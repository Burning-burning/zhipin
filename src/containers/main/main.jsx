import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {memoryUtil} from '../../utils/memoryUtil'
import {redirectTo} from '../../utils/index'
import {getUser} from '../../redux/actions'
import Laoban from '../laoban/laoban'
import {NavBar} from 'antd-mobile'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Personal from '../personal/personal'
import Chat from '../../containers/chat/chat'
import NotFound from '../../components/not-found/not-found'
import Cookies from 'js-cookie'   //可以操作前段cookie的对象
import NavFooter from '../../components/nav-footer/nav-footer'
class Main extends Component {
  navList = [
    {
      path: '/laoban',
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen',
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板'
    },
    {
      path: '/message',
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息'
    },
    {
      path: '/personal',
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人'
    },

    
  ]
  componentDidMount(){
    const userid = Cookies.get('userid')
    const {_id} = this.props.user
    if(userid&&!_id){
      this.props.getUser()
    }

  }
  render() {
  
    const {count} = memoryUtil

    const userid = Cookies.get('userid')
    if(!userid){
      return <Redirect to='/login'></Redirect>
    }
    const {_id,type, header} = this.props.user
    if(!_id){
      return null
    }else{
      let path = this.props.location.pathname
      if(path==='/'){
        path = redirectTo(type, header)
        return <Redirect to={path}></Redirect>

      }
    }
    // const {user} = this.props
    // if(!user._id){
    //   return <Redirect to='/login'></Redirect>
    // }
    const {navList} = this
    const path = this.props.location.pathname
    const currentNav = navList.find(nav=>nav.path===path)

    if(currentNav){
      const {user} = this.props
      if(user.type==='laoban'){
        navList[1].hide = true
      }else{
        navList[0].hide = true

      }
    }

    return (

      <div>
        {currentNav? <NavBar style={{top:'0px', position:'fixed', width:'100%', zIndex: '10'}}>{currentNav.title}</NavBar>:null}
        <Switch>
          {
            navList.map(nav=><Route path={nav.path} component={nav.component}></Route>)
          }
          <Route path='/laobaninfo' component={LaobanInfo}></Route>
          <Route path='/dasheninfo' component={DashenInfo}></Route>
          <Route path='/chat/:id' component={Chat}></Route>
          <Route  component={NotFound}></Route>
        </Switch>
        {currentNav?<NavFooter navList = {navList} unReadCount={this.props.unReadCount}/>:null}
      </div>
    )
  }
}


export default connect(
  state=>({user: state.user, unReadCount: state.chat.unReadCount}),
  {getUser}
)(Main)
