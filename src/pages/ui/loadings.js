import React from 'react'
import { Card,Spin,Icon,Alert } from 'antd'
import './ui.less'

export default class Loadings extends React.Component{
    render(){
        const icon = <Icon type="loading" style={{fontSize:24}} />
        return(
            <div>
                <Card title="Spin 用法" className="card-wrap">
                    <Spin size="small"/>
                    <Spin style={{margin:'0 15px'}}/>
                    <Spin size="large" tip="加载中..."/>
                    <Spin indicator={icon} style={{ marginLeft: 15 }} />
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Spin>
                        <Alert
                        message="React"
                        description="这是Alert antd"
                        type="info"
                        style={{marginBottom:10}}>

                        </Alert>
                    </Spin>
                    <Spin indicator={icon}>
                        <Alert
                        message="React"
                        description="这是Alert antd"
                        type="success"
                        style={{marginBottom:10}}>
                        </Alert>
                    </Spin>
                    <Spin tip="加载中...">
                        <Alert
                        message="React"
                        description="这是Alert antd"
                        type="warning"
                        style={{marginBottom:10}}>

                        </Alert>
                    </Spin>
                </Card>

            </div>
        )
    }
}