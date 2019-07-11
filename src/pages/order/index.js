import React from 'react'
import { Card, Button, Table, Form, Select, Modal, DatePicker, message} from 'antd'
import axios from '../../Axios'
import Utils from '../../utils/utils'
import BaseForm from '../../components/BaseForm'

const FormItem = Form.Item;
const Option = Select.Option;
export default class Order extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list:[],//分页数据
            pagination:{},//分页数据信息
            selectedRowKeys:[],//选中行的key
            selectedItem:'',//选中行的信息,此处若为{}，则下面验证不起作用，通常设置为‘’空字符串
            orderConfirmVisble:false,//是否打开modal结束订单的确认
            orderInfo:{}// 结束订单的详细信息
        }
    }
    componentWillMount(){
        this.requestList()
    }
    params={
        page:1
    }
    //baseform组件配置规则
    formList = [
        {
            type:'SELECT',
            label:'城市',
            field:'city',
            placeholder:'全部',
            initialValue:'1',
            width:80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field:'order_status',
            placeholder: '全部',
            initialValue: '1',
            width: 130,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        }
    ]
    handleFilter=(params)=>{  //向 组件 中 传递的方法
        this.params = params;
        this.requestList();
    }
    requestList=()=>{
        let _this=this;
        axios.ajax({        
            url:'/order/list',
            data:{
                params:this.params
            }
        }).then((res)=>{
            let list = res.result.item_list.map((item,index)=>{
                item.key = index;
                return item;
            });
            this.setState({
                list,
                pagination:Utils.pagination(res,(current)=>{
                    _this.params.page = current;//将请求中的params中的page变更为current页
                    //必须通过_this给params重新赋值
                    _this.requestList(); 
                })
            })
        })
    }
    onRowClick = (record, index) => {  //单行选中时
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }
    openOrderDetail=()=>{  //打开详情页面
            let item = this.state.selectedItem;
            if(!item){
                Modal.info({
                    title:'信息',
                    content:'请选择一条订单'
                })
                return;
            }
            window.open(`/#/common/order/detail/${item.id}`,'_blank')

    }
    handleFinishOrder = ()=>{       //结束订单事件
        let item = this.state.selectedItem;
        axios.ajax({
            url: '/order/finish_order',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                message.success('订单结束成功')
                this.setState({
                    orderConfirmVisble: false
                })
                this.requestList();
            }
        })
    }
    handleConfirm=()=>{  //结束订单确认事件
        let item = this.state.selectedItem;
        if (!item) {  //必须选中一条订单
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'
            })
            return;
        }
        axios.ajax({
            url:'/order/ebike_info',
            data:{
                params:{
                    orderId: item.id
                }
            }
        }).then((res)=>{
            if(res.code ==0 ){
                this.setState({
                    orderInfo:res.result,
                    orderConfirmVisble: true
                })
            }
        })

    }
    render(){
        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        //单选选中的配置
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        return(
            <div>
                <Card>
                <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" onClick={this.handleConfirm} style={{marginLeft:10}} >结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                    />
                </div>
                <Modal
                    title="结束订单"
                    visible={this.state.orderConfirmVisble}
                    onCancel={()=>{
                        this.setState({
                            orderConfirmVisble:false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}
                >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}
class FilterForm extends React.Component{

    render(){
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city')(
                            <Select
                                style={{width:80}}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="订单时间">
                    {
                        getFieldDecorator('begin_time')(
                            <DatePicker showTime={true} placeholder='开始时间' format="YYYY-MM-DD HH:mm:ss"/>
                        )
                    }
                </FormItem>
                <FormItem label="~" colon={false} >
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker showTime={true} placeholder='结束时间' format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }
                </FormItem>

                <FormItem label="用车模式">
                    {
                        getFieldDecorator('order_status')(
                            <Select
                                style={{ width: 80 }}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">结束行程</Option>
                            </Select>
                        )
                    }
                </FormItem>
                
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm);