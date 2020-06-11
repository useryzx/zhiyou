
import React from "react";
import "./UserList.css";

import { connect } from "react-redux";
import {
    queryUserList,
} from "../../store/asyncAction.js";

import {
    Table,
    Tag,
    Switch,
    
} from "antd";

class UserList extends React.Component{
    render(){
        const roleMap = {
            good:"商品管理",
            category:"分类管理",
            swiper:"轮播图管理",
            order:"订单管理",
            admin:"总管理员",
            user:"管理员"
        }
        const columns = [
            {
                title: '账号',
                dataIndex: 'account',
                key:"account",
                render(d){
                    return <b>{d}</b>
                }
            },
            { 
                title: '权限', 
                dataIndex: 'role', 
                key: 'role' ,
                render(d){
                    return(
                        d.map((el,i)=>
                            <Tag key={i}>{roleMap[el]}</Tag>
                        )
                    )
                }
            },
            {
                title: '激活/禁用',
                dataIndex: '', 
                key: 'isOnSell',
                render: (d,good) => <Switch 
                    defaultChecked={true}
                ></Switch>,
            },
        ];
        return (
            <div>
                <h3>用户列表</h3>
                <Table 
                    columns={columns} 
                    dataSource={this.props.userList} 
                    rowKey="_id"
                    pagination={false}
                    
                />
            </div>
        )
    }

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.queryUserList();
    }


}

function mapState(state) {
    return {
        userList: state.userList,
    }
}
function mapAction(dispatch, ownProps) {

    return {
        queryUserList(params) {
            return dispatch(queryUserList(params));
        }
        
    }
}
UserList = connect(mapState, mapAction)(UserList);

export default UserList;
