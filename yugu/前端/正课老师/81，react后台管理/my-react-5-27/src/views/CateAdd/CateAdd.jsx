
import React from "react";
import "./CateAdd.css";

import { 
    Form, 
    Input, 
    Button 
} from 'antd';

import {connect} from "react-redux";
import {queryAddCate} from "../../store/asyncAction.js"

class CateAdd extends React.Component{
    render(){
        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 14 },
        };
        return (
            <div>
                <h3>添加分类</h3>

                <Form {...layout} onFinish={this.categorySubmit} ref={this.form}>
                    <Form.Item name={"name"} label="分类名称" rules={[{ 
                        required: true, 
                        message: '分类名称不能为空!' 
                    }]}>
                        <Input />
                    </Form.Item>
                    
                    <Form.Item name={"introduce"} label="分类介绍" rules={[{ 
                        required: true, 
                        message: '分类介绍不能为空!' 
                    }]}>
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 16 }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        )
    }

    constructor(props){
        super(props);

        this.form = React.createRef();

        this.bindAll(["categorySubmit"]);
    }

    categorySubmit(e){
        console.log(e);
        // console.log(this.form);
        
        this.props.queryAddCate(e)
        .then(res=>{
            if(!res.data.err){
                this.form.current.resetFields();
            }
        })
    }
}


function mapState(state) {
    return {
        
    }
}
function mapAction(dispatch, ownProps) {

    return {
        queryAddCate(params) {
            return dispatch(queryAddCate(params));
        }
    }
}
CateAdd = connect(mapState, mapAction)(CateAdd);


export default CateAdd;
