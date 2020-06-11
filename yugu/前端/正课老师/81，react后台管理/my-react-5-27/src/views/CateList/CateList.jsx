
import React from "react";
import "./CateList.css";

import { connect } from "react-redux";
import { 
    queryCateList ,
    queryEditCate
} from "../../store/asyncAction.js";

import {
    Switch,
    Table,
    Button
} from "antd";

import {
    Link
} from "react-router-dom";


import {
    EditOutlined,
    RedoOutlined
} from '@ant-design/icons';

class CateList extends React.Component {
    render() {
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                // render: text => <a>{text}</a>,
            },
            {
                title: '介绍',
                dataIndex: 'introduce',
                key: 'introduce',
            },
            {
                title: '可用',
                dataIndex: 'available',
                key: 'available',
                render:(d,cate)=>{
                    return (
                        <Switch defaultChecked={d} onChange={e=>{
                            this.availableChange(cate._id,e);
                        }}/>
                    )
                }
            },
            {
                title: '修改',
                key: 'edit',
                render(d,cate){
                    return (
                        
                        <Link to={{
                            pathname:`/home/cate-edit?_id=${cate._id}`,
                            state:{name:cate.name}
                        }} style={{fontSize:"28px"}}>
                            <EditOutlined />
                        </Link>
                        
                    )
                }
            }
        ];
        return (
            <div>
                <h3>所有分类：</h3>
                <div className="CateList-btn-box">
                    <Button
                        type="primary"
                        icon={<RedoOutlined />}
                        onClick={this.props.queryCateList}
                    >刷新(F5)</Button>
                </div>
                <Table
                    columns={columns} 
                    dataSource={this.props.cateList} 
                    rowKey="_id"
                    pagination={false}
                />

                <div className="CateList-btn-box">
                    <Button
                        type="primary"
                        icon={<RedoOutlined />}
                        onClick={this.props.queryCateList}
                    >刷新(F5)</Button>
                </div>
            </div>
        )
    }

    constructor(props) {
        super(props);

        this.bindAll(["f5Press","availableChange"]);
    }

    f5Press(e){
        if(e.keyCode==116){
            e.preventDefault();
            this.props.queryCateList();
        }
    }

    componentDidMount() {
        this.props.queryCateList();
        document.body.addEventListener("keydown",this.f5Press);
    }

    componentWillUnmount(){
        document.body.removeEventListener("keydown",this.f5Press);
    }

    availableChange(_id,available){
        // console.log(_id);
        // console.log(available);
        this.props.queryEditCate({
            _id,
            available
        });
    }
    
}

function mapState(state) {
    return {
        cateList: state.cateList
    }
}
function mapAction(dispatch, ownProps) {

    return {
        queryCateList(params) {
            return dispatch(queryCateList(params));
        },
        queryEditCate(params){
            return dispatch(queryEditCate(params));
        }
    }
}
CateList = connect(mapState, mapAction)(CateList);

export default CateList;
