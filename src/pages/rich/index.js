import React from 'react'
import {Button,Card,Modal} from 'antd'
//react-draft-wysiwyg
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftjs from 'draftjs-to-html'


export default class RichText extends React.Component{
    constructor(props){
        super(props)
        this.state={
            editorState:'',//富文本编辑器的状态
            editorContent:'',//富文本编辑器获取到html格式
            showRichText:false,//显示所获取到的htmlmodal
        }
    }
    handleClearContent=()=>{  //清空富文本编辑器的状态
        this.setState({
            editorState:''
        })
    }    
    handleGetText=()=>{  //获取html文本，modal开关
        this.setState({
            showRichText:true
        })
    }
    onEditorStateChange=(editorState)=>{  //富文本编辑器状态改变的方法
            //存储最新的editorstate
            this.setState({
                editorState
            })
    }
    onEditorChange=(editorContent)=>{   //获取 富文本 html
        this.setState({
            editorContent,
        });
    }
    render(){
        return(

            <div style={{marginTop:10}}>
                <Card>
                    <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
                </Card>
                <Card title="富文本编辑器">
                    <Editor
                      editorState={this.state.editorState}
                      onEditorStateChange={this.onEditorStateChange}
                      onContentStateChange={this.onEditorChange}
                    />
                </Card>
                <Modal
                    title="富文本"
                    visible={this.state.showRichText}
                    onCancel={()=>{
                        this.setState({
                            showRichText:false
                        })
                    }}
                    footer={null}
                >
                    {draftjs(this.state.editorContent)}
                </Modal>
            </div>
        )
    }
}