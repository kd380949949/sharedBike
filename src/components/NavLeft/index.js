import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import './index.less'
import {Menu,Icon} from 'antd'
import { switchMenu, saveBtnList } from './../../redux/action'
import MenuConfig from "../../config/menuConfig"
const SubMenu = Menu.SubMenu;
 class NavLeft extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentKey:''
        }
    };
   // 菜单点击
   handleClick = ({item,key}) => {
    // if (key == this.state.currentKey) {
    //     return false;
    // }
    console.log(item)
    // 事件派发，自动调用reducer，通过reducer保存到store对象中
    const { dispatch } = this.props;
    dispatch(switchMenu(item.props.children.props.children));

    this.setState({
        currentKey: key
    });
    // hashHistory.push(key);
};
    componentWillMount(){
        // console.log(MenuConfig)
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        })
    };
    renderMenu =(data)=>{
       return data.map((item)=>{
           if(item.children){
               return ( 
                   <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                   </SubMenu>
                )
           }
           return(
            <Menu.Item  key={item.key}><NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
           )
       })
    }; 
    render() {
        return (
            <div>
                <div className="logo">
                        <img src="/assets/logo-ant.svg" alt=""/>
                        <h1>HIQ </h1>
                </div>
                <Menu
                onClick={this.handleClick}
                currentKey={this.state.currentKey}
                theme="dark"
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}
export default connect()(NavLeft)