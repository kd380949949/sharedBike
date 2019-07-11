import React from 'react'
import { Card,Button,notification } from 'antd'
import './ui.less'

export default class Notice extends React.Component{
    openNotification = (type,derection)=>{
        if(derection){
            notification.config({
                // 全局配置通知出现的位置
                placement:derection
            })
            return;
        }
        notification[type]({
            message:"发工资了",
            description:"上个月考勤22天，迟到12天，实发工资250，请笑纳"
        })
    }
    render(){
        return(
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>{this.openNotification("success")}}>Success</Button>
                    <Button type="primary" onClick={()=>{this.openNotification("info")}}>Info</Button>
                    <Button type="primary" onClick={()=>{this.openNotification("warning")}}>Warning</Button>
                    <Button type="primary" onClick={()=>{this.openNotification("error")}}>Error</Button>
                </Card>
                <Card title="通知提醒框出现位置设置" className="card-wrap">
                    <Button type="primary" onClick={()=>{this.openNotification("success",'topLeft')}}>topLeft</Button>
                    <Button type="primary" onClick={()=>{this.openNotification("info","topRight")}}>topRight</Button>
                    <Button type="primary" onClick={()=>{this.openNotification("warning","bottomLeft")}}>bottomLeft</Button>
                    <Button type="primary" onClick={()=>{this.openNotification("error","bottomRight")}}>bottomRight</Button>
                </Card>
            </div>
        )
    }
}