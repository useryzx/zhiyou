
import React from "react";
import "./AdminAdd.css";

import { 
    Form, 
    Input, 
    Button,
    
} from 'antd';

import {
    queryAddAdmin,
    
} from "../../store/asyncAction.js";

import {connect} from "react-redux";

class AdminAdd extends React.Component{
    render(){

        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 14 },
        };
        return (
            <div>
                <h3>添加管理员用户</h3>
                <Form 
                    {...layout} 
                    onFinish={this.formSubmit} 
                    ref={this.form}
                    // initialValues={{
                    //     image:this.state.image,
                    //     images:this.state.images
                    // }}
                >
                    <Form.Item name={"account"} label="账号名称" rules={[{ 
                        required: true, 
                        message: '账号不能为空!' 
                    }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="密码">
                        新用户初始密码为123456，创建之后请立刻修改密码。
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

        this.bindAll(["formSubmit"]);
    }

    formSubmit(e){
        // console.log(e);
        this.props.queryAddAdmin(e)
        .then(res=>{
            if(!res.data.err){
                this.form.current.resetFields();
            }
        });
    }
}


function mapState(state) {
    return {
        
    }
}
function mapAction(dispatch, ownProps) {

    return {
        queryAddAdmin(params) {
            return dispatch(queryAddAdmin(params));
        },
        
    }
}
AdminAdd = connect(mapState, mapAction)(AdminAdd);

export default AdminAdd;



