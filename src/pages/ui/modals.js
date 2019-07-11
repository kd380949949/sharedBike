import React from 'react'
import { Card,Button,Modal } from 'antd'
import './ui.less'

export default class Modals extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showModal1:false,
            showModal2:false,
            showModal3:false,
            showModal4:false

        }
    }
    handleOpen=(type)=>{
        this.setState({
            [type]:true
            // 属性名表达式
        })
    }
    handleConfirm=(type)=>{
        Modal[type]({
            title:"确认？",
            content:'你确定学会react了？',
            onOk(){
                console.log('yes')
            },
            onCancel(){
                console.log('no')
            }
        })
    }
    render(){
        return(
            <div>
                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleOpen("showModal1")}>Open</Button>
                    <Button type="primary"  onClick={()=>this.handleOpen("showModal2")}>自定义页脚</Button>
                    <Button type="primary" onClick={()=>this.handleOpen("showModal3")}>顶部20px弹框</Button>
                    <Button type="primary" onClick={()=>this.handleOpen("showModal4")}>水平垂直居中</Button>
                </Card>
                <Card title="信息确认框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleConfirm("confirm")}>Confirm</Button>
                    <Button type="primary"  onClick={()=>this.handleConfirm("info")}>INFO</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm("success")}>SUCCESS</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm("warning")}>warning</Button>
                </Card>
                <Modal
                title="React"
                visible={this.state.showModal1}
                onCancel={()=>{this.setState({showModal1:false})}}>
                        <p>欢迎观看</p>
                </Modal>
                <Modal
                title="React"
                okText="好的"
                cancelText="算了"
                visible={this.state.showModal2}
                onCancel={()=>{this.setState({showModal2:false})}}>
                        <p>欢迎观看</p>
                </Modal>
                <Modal
                title="React"
                style={{top:20}}
                visible={this.state.showModal3}
                onCancel={()=>{this.setState({showModal3:false})}}>
                        <p>欢迎观看</p>
                        {/* top20实现需要修改原生的样式，ui.less中有  */}
                </Modal>
                <Modal
                title="React"
                wrapClassName="vertical-center-modal"
                visible={this.state.showModal4}
                onCancel={()=>{this.setState({showModal4:false})}}>
                        <p>欢迎观看</p>
                        {/* wrapClassName是原有插件的属性,vertical-center-modal样式是自定义的 */}
                </Modal>
            </div>
        )
    }
}