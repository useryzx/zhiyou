
import React from "react";
import "./Login.css";
import { Form, Input, Button, Checkbox } from 'antd';

import { UserOutlined, LockOutlined } from '@ant-design/icons'


import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { queryLogin } from '../../store/asyncAction.js'

class Login extends React.Component {
	render() {
		return (
			<div className="Login-root">
				<h1 className="Login-title">商品后台管理系统</h1>
				<div className="Login-login-box">
					<h2>用户登陆</h2>
					<Form
						name="basic"
						onFinish={this.loginSubmit}
						// 账号先写上
						initialValues={{
							account: "admin",
							psw: "123456"
						}}
					// onFinishFailed={onFinishFailed}
					>
						<Form.Item
							label="用户"
							name="account"
							rules={[
								{
									required: true,
									message: '账号不能为空',
								},
							]}
						>
							<Input
								prefix={<UserOutlined className="site-form-item-icon" />}
							/>
						</Form.Item>

						<Form.Item
							label="密码"
							name="psw"
							rules={[
								{
									required: true,
									message: '密码不能为空',
								},
							]}
						>
							<Input.Password
								prefix={<LockOutlined className="site-form-item-icon" />}
							/>
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit">
								登陆
                        </Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		)
	}

	constructor(props) {
		super(props);
		this.bindAll(['loginSubmit'])
	}
	loginSubmit(e) {
		// 发送登陆请求
		this.props.queryLogin(e)
			.then(res => {
				if (res.data.err == 0) {
					// 登陆成功
					this.props.history.push('/')
				}
			})
			.catch(err => {
				console.log(err);

			})
	}
}
function mapState() {
	return {

	}
}
function mapAction(dispatch, ownProps) {
	return {
		queryLogin(params) {
			return dispatch(queryLogin(params))
		}
	}
}
Login = connect(mapState, mapAction)(Login);
export default Login;
