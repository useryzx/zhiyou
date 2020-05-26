
import React from "react";
import "./Login.css";

// import { Link } from "react-router-dom";
import { 
    Form,
    Input, 
    Button
    
} from 'antd';

import {
    UserOutlined ,
    LockOutlined
}from "@ant-design/icons"

import {connect} from "react-redux";
import {queryLogin} from "../../store/asyncAction.js";


class Login extends React.Component {
    render() {
        return (
            <div className="Login-root">
                <h1 className="Login-title">商品后台管理系统</h1>
                <div className="Login-login-box">
                    <h2>用户登录</h2>
                    <Form
                        name="basic"
                        onFinish={this.loginSubmmit}
                        initialValues={{
                            account:"admin",
                            psw:"123456"
                        }}
                    >
                        <Form.Item
                            
                            label="账号"
                            name="account"
                            rules={[
                                {
                                    required: true,
                                    message: '账号不能为空!',
                                },
                            ]}
                        >
                            <Input 
                                prefix={<UserOutlined/>}
                            />
                        </Form.Item>

                        <Form.Item
                            
                            label="密码"
                            name="psw"
                            rules={[
                                {
                                    required: true,
                                    message: '密码不能为空!',
                                },
                            ]}
                        >
                            <Input.Password 
                                prefix={<LockOutlined />}
                            />
                        </Form.Item>
                        <Form.Item
                            
                            wrapperCol={{offset:20,span:4}}
                        >
                            <Button type="primary" htmlType="submit" className="Login-commit-btn">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }

    constructor(props) {
        super(props);

        this.bindAll(["loginSubmmit"]);
    }

    loginSubmmit(e){
        // console.log(e);
        this.props.queryLogin(e)
        .then(res=>{
            // console.log(res);
            if(res.data.err == 0){
                // console.log(this.props);
                this.props.history.push("/");
            }
        })
    }

    
}


function mapState(state){
    return {
        
    }
}

function mapAction(dispatch,ownProps){

    return {
        // setStr(v){
        //     dispatch(setStr(v));
        // },
        // queryObj(){
        //     return dispatch(queryObj());
        // }
        queryLogin(params){
            return dispatch(queryLogin(params));
        }
    }
}

Login = connect(mapState,mapAction)(Login);

export default Login;
