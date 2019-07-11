import React from 'react'
import{ Card,Button,Icon,Radio } from 'antd'
import './ui.less'

export default class Buttons extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isLoading:false,
            size:"small"
        }
    }

    handleCloseLoading=()=>{
            this.setState({isLoading:false})
    };
    handleOpenLoading=()=>{
        this.setState({
            isLoading:true
        })
    }
    handleChange=(e)=>{
        this.setState({
            size:e.target.value
        })
    }
    render(){
        return(
          <div>
            <Card title="基础按钮" className="card-wrap">
                <Button type="primary">Button</Button>
                <Button type="dashed">Button</Button>
                <Button type="danger">Button</Button>
                <Button >Button</Button>
                <Button disabled>Button</Button>
            </Card>
            <Card title="图形按钮" className="card-wrap">
                <Button icon="plus">创建</Button>
                <Button icon="edit">编辑</Button>
                <Button icon="delete">删除</Button>
                <Button shape="circle" icon="search"></Button>
                <Button type="primary" icon="search">搜索</Button>
                <Button type="primary" icon="download">下载</Button>
            </Card>
            <Card title="loading按钮" className="card-wrap">
                <Button type="primary" loading={this.state.isLoading} onClick={this.handleOpenLoading}>确定</Button>
                {/* loading效果不会覆盖掉button内容 */}
                <Button type="primary" shape="circle" icon="search" loading={this.state.isLoading} onClick={this.handleOpenLoading}></Button>
                {/* 此处loading效果会覆盖掉原icon */}
                <Button loading={this.state.isLoading} onClick={this.handleOpenLoading}>点击加载</Button>
                <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
            </Card>
            <Card title="按钮组" className="card-wrap">
                <Button.Group>
                <Button  style={{marginRight:0}}><Icon type="left"></Icon>返回</Button>
                <Button >前进<Icon type="right"></Icon></Button>
                </Button.Group>
            </Card>
            <Card title="按钮尺寸" className="card-wrap">
                <Radio.Group value={this.state.size} onChange={this.handleChange}>
                    <Radio value="small">小</Radio>
                    <Radio value="default">中</Radio>
                    <Radio value="large">大</Radio>
                </Radio.Group>
                <Button type="primary" size={this.state.size}>Button</Button>
                <Button type="dashed"size={this.state.size}>Button</Button>
                <Button type="danger" size={this.state.size}>Button</Button>
            </Card>
          </div>  
        )
    }
}