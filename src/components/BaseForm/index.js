import React from 'react'
import {Input, Select, Form, Button, Checkbox, Radio, DatePicker} from 'antd'
import Utils from '../../utils/utils'

const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends React.Component{
    handleFilterSubmit=()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        //
        //父组件传过来的方法，用于向父组件传值 filterSubmit
        //
        this.props.filterSubmit(fieldsValue);
    }
    reset = ()=>{
        this.props.form.resetFields();
    }
    initFormList = ()=>{
        const {getFieldDecorator} = this.props.form;
        const formList = this.props.formList;//使用时传过来配置信息
        const formItemList = [];//用于存储根据配置文件配置好的各项表单
        if(formList&&formList.length>0){
            formList.forEach(item => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue||''; //初值，默认值
                let placeholder = item.placeholder;
                let width = item.width;
                //时间查询
                //传过来数据格式{ type：‘时间查询’}
                if(item.type=='时间查询'){
                    const begin_time = <FormItem label="订单时间" key={field}>
                    {
                        getFieldDecorator('begin_time')(
                            <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                        )
                    }
                    </FormItem>;
                    formItemList.push(begin_time);
                    //colon:{true}用于隐藏label名字后面自动出现的冒号
                    const end_time = <FormItem label="~" colon={false} key={field}>
                        {
                            getFieldDecorator('end_time')(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>;
                    formItemList.push(end_time)

                }
                //INPUT组件的封装
                //传过来的数据格式{type:'INPUT',label,field,intialvalue,palceholder}
                else if(item.type=='INPUT'){ 
                    const INPUT  = <FormItem label={label} key={field}>
                        {getFieldDecorator([field],{
                            initialValue:initialValue
                        })(
                            <Input type='text' placeholder={placeholder}/>
                        )}
                    </FormItem>
                    formItemList.push(INPUT)
                }
                 //SELECT组件的封装
                //传过来的数据格式{type:'SELECT',label,field,intialvalue,palceholder,width,list}
                else if(item.type == 'SELECT'){
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                initialValue: initialValue
                            })(
                                <Select
                                    style={{ width: width }}
                                    placeholder={placeholder}
                                >
                                    {Utils.getOptionList(item.list)}
                                </Select>
                            )
                        }
                    </FormItem>;
                    formItemList.push(SELECT)
                }
                //checkbox组件封装
                else if (item.type == 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                valuePropName: 'checked',
                                initialValue: initialValue //true | false
                            })(
                                <Checkbox>
                                    {label}
                                </Checkbox>
                            )
                        }
                    </FormItem>;
                    formItemList.push(CHECKBOX)
                }

            });
        }
        return formItemList;    
    }

    render(){
        return(
            <Form layout="inline">
                { this.initFormList() }
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
export default Form.create({})(FilterForm);