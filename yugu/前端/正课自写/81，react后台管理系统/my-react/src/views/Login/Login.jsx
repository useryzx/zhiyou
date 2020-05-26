
import React from "react";

import { Form, Input, Button } from 'antd';
import "./Login.css";
import logo from './images/photo.jpg'

const layout = {
	labelCol: {
	  span: 8,
	},
	wrapperCol: {
	  span: 16,
	},
  };
  const tailLayout = {
	wrapperCol: {
	  offset: 8,
	  span: 16,
	},
  };


class Login extends React.Component {
	onFinish = (values) => {
		alert("tijiao")
	};
	render() {
		return (
			<div className="login">
				<div className="login-header">
					<img src={logo} alt="logo" />
					<h1>yuguaa react</h1>
				</div>
				<div className="login-body">
					<div className="login-content">
						<h1>用户登陆</h1>
						<div>
							<Form
								{...layout}
								name="basic"
								initialValues={{
									remember: true,
								}}
								onFinish={this.onFinish}
							
							>
								<Form.Item
									label="Username"
									name="username"
									rules={[
										{
											required: true,
											message: 'Please input your username!',
										},
									]}
								>
									<Input />
								</Form.Item>

								<Form.Item
									label="Password"
									name="password"
									rules={[
										{
											required: true,
											message: 'Please input your password!',
										},
									]}
								>
									<Input.Password />
								</Form.Item>

								<Form.Item {...tailLayout}>
									<Button type="primary" htmlType="submit">
										登陆
        							</Button>
								</Form.Item>
							</Form>
						</div>
					</div>
				</div>
			</div>
		)
	}

	constructor(props) {
		super(props);
	}
}

export default Login;
