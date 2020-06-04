import React, { Component, memo } from 'react'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import '../../assets/css/index.less'
import PropTypes from 'prop-types'
import "./nav-footer.less"
const Item = TabBar.Item
class NavFooter extends Component {
  static propTypes = {
    navList: PropTypes.array.isRequired,
    unReadCount: PropTypes.number.isRequired
  }
  render() {
    let {navList} = this.props
    const path = this.props.location.pathname
    navList = navList.filter(nav=>!nav.hide)
    
    return (
      <TabBar className="shx">
        {
          navList.map((nav,index)=>(
            <Item 
            badge={nav.path==='/message'?this.props.unReadCount:0}
            key = {nav.path} 
            title={nav.text} 
            icon={{uri: require(`./images/${nav.icon}.png`)}} 
            selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}} 
            selected={nav.path===path} 
            onPress = {()=>this.props.history.replace(nav.path)}
            />
          ))
        }
      </TabBar>
    )
  }
}

export default withRouter(NavFooter)