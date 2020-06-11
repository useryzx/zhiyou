import React from "react";
import "./Home.css";

import { connect } from "react-redux";

import { queryIsLogin } from "../../store/asyncAction.js";

import {
  Menu,
  Button,
  Tabs,
} from "antd";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  MailOutlined
} from '@ant-design/icons';


import {
  HashRouter,
  Route,
  Link
} from "react-router-dom";

import CateList from "../CateList/CateList.jsx";
import CateAdd from "../CateAdd/CateAdd.jsx";
import CateEdit from "../CateEdit/CateEdit.jsx";


import pathToKeyMap from "./pathToKeyMap.js";
import keyToTitleMap from "./keyToTitleMap.js";


const { SubMenu } = Menu;
const { TabPane } = Tabs;

class Home extends React.Component {

  render() {
    return (
      <div>
        <div className="Home-root">
          <div className="Home-sider">
            <div className="Home-open-btn">
              <Button type="primary" onClick={this.toggleCollapsed} style={{ width: "100%" }}>
                {this.state.isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </Button>
            </div>
            <Menu
              theme="light"
              mode="inline"
              // defaultSelectedKeys={['data']}
              selectedKeys={this.calcSelectKey()}
              defaultOpenKeys={['category']}
              className="Home-menu"
              inlineCollapsed={this.state.isCollapse}
              style={{
                width: this.state.isCollapse ? "80px" : "260px"
              }}
            >
              <Menu.Item key="data" icon={<UserOutlined />}>
                数据统计
              </Menu.Item>

              <SubMenu
                key="category"
                title={
                  <span>
                    <MailOutlined />
                    <span>分类管理</span>
                  </span>
                }
              >
                <Menu.Item key="category0" icon={<VideoCameraOutlined />}>
                  <Link to="/home/cate-list">查看分类</Link>
                </Menu.Item>
                <Menu.Item key="category1" icon={<VideoCameraOutlined />}>
                  <Link to="/home/cate-add">添加分类</Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu
                key="good"
                title={
                  <span>
                    <MailOutlined />
                    <span>商品管理</span>
                  </span>
                }
              >
                <Menu.Item key="good0" icon={<UploadOutlined />}>
                  查看商品
                </Menu.Item>
                <Menu.Item key="good1" icon={<VideoCameraOutlined />}>
                  添加商品
                </Menu.Item>
              </SubMenu>

              <SubMenu
                key="order"
                title={
                  <span>
                    <MailOutlined />
                    <span>订单管理</span>
                  </span>
                }
              >
                <Menu.Item key="order0" icon={<UploadOutlined />}>
                  查看订单
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="swiper"
                title={
                  <span>
                    <MailOutlined />
                    <span>轮播图管理</span>
                  </span>
                }
              >
                <Menu.Item key="swiper0" icon={<UploadOutlined />}>
                  设置轮播图
                </Menu.Item>
              </SubMenu>

              <SubMenu
                key="user"
                title={
                  <span>
                    <MailOutlined />
                    <span>用户管理</span>
                  </span>
                }
              >
                <Menu.Item key="user0" icon={<UploadOutlined />}>
                  添加管理员
                </Menu.Item>
                <Menu.Item key="user1" icon={<UploadOutlined />}>
                  添加用户
                </Menu.Item>

              </SubMenu>

              <SubMenu
                key="account"
                title={
                  <span>
                    <MailOutlined />
                    <span>账号</span>
                  </span>
                }
              >
                <Menu.Item key="account0" icon={<UploadOutlined />}>
                  修改密码
                </Menu.Item>
                <Menu.Item key="account1" icon={<UploadOutlined />}>
                  退出登录
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
          <div className="Home-main">
            <div className="Home-header">
              <Tabs
                onChange={this.tabsChange}
                activeKey={this.calcSelectKey()[0]}
                type="editable-card"
                hideAdd
              // onEdit={this.onEdit}
              >
                {this.state.openedPages.map(pane => (
                  <TabPane tab={pane.title} key={pane.key} closable={true}></TabPane>
                ))}
              </Tabs>
            </div>
            <div className="Home-content">
              <div className="page-root">
                <HashRouter>
                  <Route exact path="/home/cate-list" component={CateList}></Route>
                  <Route exact path="/home/cate-add" component={CateAdd}></Route>
                  <Route exact path="/home/cate-edit" component={CateEdit}></Route>
                </HashRouter>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      isCollapse: false,
      //
      openedPages: [
        // { key: "category0", title: "查看分类" },
      ]
    }

    this.bindAll([
      "checkLogin",
      "toggleCollapsed",
      "calcSelectKey",
      "registRouteListener",
      "calcTabsKey",
      "tabsChange"
    ]);
  }

  componentDidMount() {
    this.checkLogin();
    this.registRouteListener();
    this.calcTabsKey({ pathname: this.props.location.pathname });
  }

  registRouteListener() {
    this.props.history.listen(this.calcTabsKey);
  }

  calcTabsKey(r) {
    // console.log(r.pathname);
    let key = pathToKeyMap[r.pathname];
    let hasOpened = this.state.openedPages.some(el => {
      return el.key == key
    });
    if (!hasOpened) {
      this.state.openedPages.push({ key: key, title: keyToTitleMap[key] })
      this.setState({
        openedPages: this.state.openedPages
      });
    }
  }

  checkLogin() {
    if (!this.props.userInfo) {
      this.props.queryIsLogin()
        .then(res => {
          if (res.data.err) {
            this.props.history.push("/login");
          }
        });
    }
  }

  toggleCollapsed() {
    this.setState({
      isCollapse: !this.state.isCollapse
    });
  }

  calcSelectKey() {
    let key = pathToKeyMap[this.props.location.pathname];
    return [key];
  }

  tabsChange(e) {
    console.log(e);
  }
}

function mapState(state) {
  return {
    userInfo: state.userInfo
  }
}

function mapAction(dispatch, ownProps) {
  return {
    queryIsLogin(params) {
      return dispatch(queryIsLogin(params));
    }
  }
}

Home = connect(mapState, mapAction)(Home);

export default Home;
