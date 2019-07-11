import React from 'react'
import {Card}from 'antd'
import ReactEcharts from 'echarts-for-react'

//yarn add echarts echarts-for-react --save
//导入echarts主题模块，从官网导出的文件，置于开发路径下
import echartTheme from '../echartTheme.js'
//全局导入echarts模块，内容太大
// import echarts from 'echarts'

//按需引入echarts模块
//1 引入echarts主模块
import echarts from 'echarts/lib/echarts'
//2 引入柱状图，需要的图
import 'echarts/lib/chart/line'
//引入提示框和标题组件等
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

export default class Line extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    componentWillMount(){
        echarts.registerTheme('Imooc',echartTheme);
    }
    getOption=()=>{
        let option={
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis: {
                data: [
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'line',
                    data:[
                        1000,
                        2000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ]
            
                }
            ]
        }
        return option;
    }
    getOption2=()=>{
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend:{
                data:['OFO订单量','摩拜订单量']
            },
            xAxis: {
                data: [
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO订单量',
                    type: 'line',
                    stack: '总量',
                    data: [
                        1200,
                        3000,
                        4500,
                        6000,
                        8000,
                        12000,
                        20000
                    ]
                },
                {
                    name: '摩拜订单量',
                    type: 'line',
                    stack: '总量',
                    data: [
                        1000,
                        2000,
                        5500,
                        6000,
                        8000,
                        10000,
                        12000
                    ]
                },
            ]

        }
        return option;
    }
    getOption3() {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type:'category',
                boundaryGap: false,
                data: [
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [
                        1000,
                        2000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ],
                    areaStyle: {}  //覆盖层area样式
                }
            ]
        }
        return option;
    }
    getOption4=()=>{
        let option = {
            title: {
                text: 'abc'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                // min: -100,
                // max: 80,
                type: 'value',
                
            },
            yAxis: {
                min: -30,
                max: 60,
                type: 'value',
                
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data:[[15, 0], [-50, 10], [-56.5, 20], [-46.5, 30], [-22.1, 40]],
                    smooth:false
                }
            ]
        }
        return option;

    }
    render(){
        return(
            <div>
            <Card title="折线图表之一">
                <ReactEcharts option={this.getOption()} theme='Imooc' notMerge={true} lazyUpdate={true} style={{ height: 500 }}/>
            </Card>
            <Card title="折线图表之二"  style={{marginTop:10}}>
                <ReactEcharts option={this.getOption2()} theme='Imooc'notMerge={true} lazyUpdate={true} style={{ height: 500 }}/>
            </Card>
            <Card title="折线图表之二"  style={{marginTop:10}}>
                <ReactEcharts option={this.getOption3()} theme='Imooc'notMerge={true} lazyUpdate={true} style={{ height: 500 }}/>
            </Card>
            <Card title="折线图表之二"  style={{marginTop:10}}>
                <ReactEcharts option={this.getOption4()} theme='Imooc'notMerge={true} lazyUpdate={true} style={{ height: 500 }}/>
            </Card>
            </div>
        )
    }
}