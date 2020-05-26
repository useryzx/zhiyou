
import React from "react";
import "./Home.css";


import { connect } from 'react-redux'
import { queryIsLogin } from '../../store/asyncAction.js'

import { Menu, Layout } from 'antd'
import {
	AppstoreOutlined,
	BarChartOutlined,
	CloudOutlined,
	ShopOutlined,
	TeamOutlined,
	UserOutlined,
	UploadOutlined,
	VideoCameraOutlined,
	MailOutlined,
	SettingOutlined
} from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu
class Home extends React.Component {
	render() {
		return (
			<div>
				<Sider theme="light">
					<div className="Home-open-btn" />
					<Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
						<Menu.Item key="1" icon={<UserOutlined />}>
							数据统计
						</Menu.Item>
						<SubMenu
          key="sub1"
          title={
            <span>
              <MailOutlined />
              <span>商品分类</span>
            </span>
          }
        >
          <Menu.ItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
						<Menu.Item key="3" icon={<UploadOutlined />}>
							nav 3
        		</Menu.Item>
						<Menu.Item key="4" icon={<BarChartOutlined />}>
							nav 4
        		</Menu.Item>
					</Menu>
				</Sider>
				<Layout className="site-layout">
					<Header className="site-layout-background">Header</Header>
					<Content>Content</Content>
					<Footer>Footer</Footer>
				</Layout>
			</div>
		)
	}

	componentDidMount() {
		this.checkLogin();
	}


	checkLogin() {
		if (!this.props.userInfo) {
			this.props.queryIsLogin()
				.then(res => {
					if (res.data.err) {
						this.props.history.push('/login')
					}
				})
		}
	}
	constructor(props) {
		super(props);
		this.bindAll(['checkLogin'])
	}
}
function mapState(state) {
	return {
		userInfo: state.userInfo
	}
}

function mapAction(dispatch, ownProps) {
	return {
		queryIsLogin() {
			return dispatch(queryIsLogin())
		}
	}
}
Home = connect(mapState, mapAction)(Home)

export default Home;
