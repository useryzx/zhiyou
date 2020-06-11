
import React from "react";
import "./Home.css";

import {
    Menu,
    Button,
    Tabs,
    Dropdown,

} from "antd";

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    MenuOutlined,
    UserOutlined,
    ShoppingOutlined,
    LineChartOutlined,
    UnorderedListOutlined,
    FileImageOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';

import {
    // HashRouter,
    // Route,
    Link
} from "react-router-dom";

import HomeHoc from "./HomeHoc.jsx";

const { SubMenu } = Menu;
const {TabPane} = Tabs;


function Home(props){
    if(!props.userInfo){
        return "";
    }

    const menu = (
        <Menu>
            <Menu.Item key="1">
                <Link to="/home/change-pass">修改密码</Link>
                
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="2"  onClick={e=>{
                props.queryLogout()
                .then(res=>{
                    if(!res.data.err){
                        window.location.href="/";
                    }
                })
            }}>退出登录</Menu.Item>
        </Menu>
    );

    return (
        <div>
            <div className="Home-root">
                <div className="Home-sider">
                    <div className="Home-open-btn">
                        <Button type="primary" onClick={props.toggleCollapsed} style={{ width: "100%" }}>
                            {props.isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        </Button>
                    </div>
                    <Menu
                        theme="light"
                        mode="inline"
                        // defaultSelectedKeys={['data']}
                        selectedKeys={[props.location.pathname]}
                        defaultOpenKeys={['good']}
                        className="Home-menu"
                        inlineCollapsed={props.isCollapse}
                        style={{
                            width: props.isCollapse ? "80px" : "260px"
                        }}
                    >
                        <Menu.Item key="/home/statement" icon={<LineChartOutlined />}>
                            <Link to="/home/statement">数据统计</Link>
                        </Menu.Item>

                        <SubMenu
                            key="category"
                            title={
                                <span>
                                    <MenuOutlined />
                                    <span>分类管理</span>
                                </span>
                            }
                        >
                            <Menu.Item key="/home/cate-list" icon={<MenuOutlined />}>
                                <Link to="/home/cate-list">查看分类</Link>
                            </Menu.Item>
                            <Menu.Item key="/home/cate-add" icon={<MenuOutlined />}>
                                <Link to="/home/cate-add">添加分类</Link>
                            </Menu.Item>
                            

                        </SubMenu>

                        <SubMenu
                            key="good"
                            title={
                                <span>
                                    <ShoppingOutlined />
                                    <span>商品管理</span>
                                </span>
                            }
                        >
                            <Menu.Item key="/home/good-list" icon={<ShoppingOutlined />}>
                                <Link to="/home/good-list">查看商品</Link>
                            </Menu.Item>
                            <Menu.Item key="/home/good-add" icon={<ShoppingOutlined />}>
                                <Link to="/home/good-add">添加商品</Link>
                            </Menu.Item>
                            

                        </SubMenu>

                        <SubMenu
                            key="order"
                            title={
                                <span>
                                    <UnorderedListOutlined />
                                    <span>订单管理</span>
                                </span>
                            }
                        >
                            <Menu.Item key="/home/order-list" icon={<UnorderedListOutlined />}>
                                <Link to="/home/order-list">查看订单</Link>
                            </Menu.Item>

                        </SubMenu>

                        <SubMenu
                            key="swiper"
                            title={
                                <span>
                                    <FileImageOutlined />
                                    <span>轮播图管理</span>
                                </span>
                            }
                        >
                            <Menu.Item key="/home/swiper-edit" icon={<FileImageOutlined />}>
                                <Link to="/home/swiper-edit">设置轮播图</Link>
                            </Menu.Item>


                        </SubMenu>
                        
                        
                        <SubMenu
                            key="user"
                            title={
                                <span>
                                    <UsergroupAddOutlined />
                                    <span>用户管理</span>
                                </span>
                            }
                        >
                            <Menu.Item key="/home/user-list" icon={<UsergroupAddOutlined />}>
                                <Link to="/home/user-list">用户列表</Link>
                            </Menu.Item>
                            <Menu.Item key="/home/admin-add" icon={<UsergroupAddOutlined />}>
                                <Link to="/home/admin-add">添加管理员</Link>
                            </Menu.Item>
                            <Menu.Item key="/home/user-add" icon={<UsergroupAddOutlined />}>
                                <Link to="/home/user-add">添加用户</Link>
                            </Menu.Item>

                        </SubMenu>

                        <SubMenu
                            key="account"
                            title={
                                <span>
                                    <UserOutlined />
                                    <span>账号</span>
                                </span>
                            }
                        >
                            <Menu.Item key="/home/change-pass" icon={<UserOutlined />}>
                                <Link to="/home/change-pass">修改密码</Link>
                            </Menu.Item>
                            <Menu.Item key="account1" icon={<UserOutlined />} onClick={e=>{
                                props.queryLogout()
                                .then(res=>{
                                    if(!res.data.err){
                                        window.location.href="/";
                                    }
                                })
                                
                            }}>
                                退出登录
                            </Menu.Item>

                        </SubMenu>


                    </Menu>
                </div>
                <div className="Home-main">
                    <div className="Home-header">
                        <h1 className="Home-title">XXX商品管理系统</h1>
                        
                        <div className="Home-user-info">
                            {props.userInfo&&(
                                <Dropdown overlay={menu}>
                                    <span className="Home-user-info-label">
                                        <UserOutlined />{props.userInfo.account}
                                    </span>
                                </Dropdown>
                            )}
                            
                        </div>
                    </div>
                    <div className="Home-content">
                        
                        <Tabs
                            onChange={props.tabsChange}
                            activeKey={props.location.pathname+props.location.search}
                            type="editable-card"
                            hideAdd
                            onEdit={props.tabsClose}
                            tabBarStyle={{
                                width:`calc(100vw - ${props.isCollapse?"90":"270"}px)`
                                
                            }}
                        >
                            {props.openedPages.map(pane => (
                                <TabPane tab={`${pane.title}${pane.name?"("+pane.name+")":""}`} key={pane.key} closable={true}>
                                    <div className="page-root">
                                        <pane.page 
                                            location={props.location}
                                            history={props.history}
                                            match={props.match}
                                        ></pane.page>
                                    </div>
                                    
                                </TabPane>
                            ))}
                        </Tabs>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

Home = HomeHoc(Home);

export default Home;