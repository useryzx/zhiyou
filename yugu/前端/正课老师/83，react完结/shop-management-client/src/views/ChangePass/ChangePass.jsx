
import React from "react";
import "./ChangePass.css";

import { connect } from "react-redux";
import {
    querychangePass,
} from "../../store/asyncAction.js";

import { 
    Form, 
    Input, 
    Button,
    
} from 'antd';

class ChangePass extends React.Component{
    render(){
        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 8 },
        };
        return (
            <div>
                <h3>修改密码</h3>

                <Form 
                    {...layout} 
                    onFinish={this.formSubmit} 
                    ref={this.form}
                    
                >
                    <Form.Item name={"psw"} label="原密码" rules={[{ 
                        required: true, 
                        message: '原密码不能为空!' 
                    }]}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name={"newpsw"} label="新密码" rules={[{ 
                        required: true, 
                        message: '新密码不能为空!' 
                    }]}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="second" label="再次输入新密码" rules={[
                        { 
                            required: true, 
                            message: '原密码不能为空!' 
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                              if ( getFieldValue('newpsw') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject('两次密码输入不一致!');
                            },
                        })
                    ]}>
                        <Input.Password />
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 10 }}>
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

        this.bindAll([
            "formSubmit"
        ]);
    }

    formSubmit(e){
        delete e.second;
        console.log(e);
        
        this.props.querychangePass(e)
        .then(res=>{
            if(!res.data.err){
                this.form.current.resetFields();
            }
        })
    }
}

function mapState(state) {
    return {
        userList: state.userList,
    }
}
function mapAction(dispatch, ownProps) {

    return {
        querychangePass(params) {
            return dispatch(querychangePass(params));
        }
        
    }
}
ChangePass = connect(mapState, mapAction)(ChangePass);

export default ChangePass;
