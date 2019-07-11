import React from 'react'
import { Card,Tabs,message,Icon} from 'antd'
import './ui.less'
const TabPane = Tabs.TabPane

export default class Tabss extends React.Component{
    constructor(props){
        super(props)
        this.state={
            newTabIndex:0
        }
    }
    componentWillMount(){
        const panes = [
            {
                title:'Tab 1',
                content: 'Tab 1',
                key:'1'
            },
            {
                title: 'Tab 2',
                content: 'Tab 2',
                key: '2'
            },
            {
                title: 'Tab 3',
                content: 'Tab 3',
                key: '3'
            }
        ];
        this.setState({
            panes,
            activeKey:panes[0].key
        });
    }
    handleCallback=(key)=>{
            message.info("Hi,您选择了页签"+key)
    }
    onChange = (activeKey)=>{
        this.setState({
            activeKey
        })
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.state.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    }
    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }

    render(){
        return(
            <div>
                <Card title="Tab标签页" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab="Tab 1" key="1">选项卡一内容</TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>选项卡二内容</TabPane>
                        <TabPane tab="Tab 3" key="3">选项卡三内容</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图标签页" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab={<span><Icon type="plus"></Icon>Tab 1</span>} key="1">选项卡一内容</TabPane>
                        <TabPane tab={<span><Icon type="edit"></Icon>Tab 2</span>} key="2" >选项卡二内容</TabPane>
                        <TabPane tab={<span><Icon type="delete"></Icon>Tab 3</span>} key="3">选项卡三内容</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab可编辑的页签" className="card-wrap">
                    <Tabs 
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map((panel)=>{
                                return <TabPane 
                                    tab={panel.title}
                                    key={panel.key}
                                >{panel.content}
                                </TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}
