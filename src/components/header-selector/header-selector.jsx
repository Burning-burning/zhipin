import React, { Component } from 'react'
import {
  List,
  Grid,

} from 'antd-mobile'
import PropTypes from 'prop-types'
export default class HeaderSelector extends Component {
  static propTypes = {
    setHeader: PropTypes.func.isRequired
  }
  state = {
    icon: null
  }
   
  constructor(props){
    super(props)
    this.headerList=[]
    for(let i=1; i<=20; i++){
      this.headerList.push({
        icon: require(`../../assets/images/头像${i}.png`),
        text: '头像'+i
      })
    }
  }
  handleClick = ({text, icon})=>{
    this.props.setHeader(text)
    this.setState({
      icon
    })
    
  }
  render() {
    const {icon} = this.state
    const title = icon?(<div>已选择头像：<img src = {icon} alt={icon}></img></div>):'请选择头像'
    return (
      <List renderHeader={title}> 
        <Grid data={this.headerList} columnNum={5} onClick={this.handleClick}>

        </Grid>

      </List>
    )
  }
}
