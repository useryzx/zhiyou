
import React from "react";
import "./OrderList.css";

import { connect } from "react-redux";
import {
    queryOrderList
    
} from "../../store/asyncAction.js";

import {
    Table,
    Tag,
    Switch,
    // Pagination ,
    Row,
    Col,
    Form,
    Input,
    Select,
    Button,
    DatePicker
} from "antd";


import {
    SearchOutlined,
    ClearOutlined,
} from "@ant-design/icons"

import utils from "../../utils/utils.js";

// import zhCN from 'antd/es/locale/zh_CN';

let {Option} = Select;

class OrderList extends React.Component{
    render(){
        

        const stateArr = [
            {key:"0",value:(<Tag color="warning">未付款</Tag>)},
            {key:"10",value:(<Tag color="processing">已付款待发货</Tag>)},
            {key:"20",value:(<Tag color="processing">已发货待收货</Tag>)},
            {key:"30",value:(<Tag color="success">已收货</Tag>)},
            {key:"40",value:(<Tag color="error">申请售后</Tag>)},
            {key:"50",value:(<Tag color="default">已取消</Tag>)},
            {key:"60",value:(<Tag color="success">售后完成</Tag>)},
        ]

        const columns = [
            {
                title: '订单编号',
                dataIndex: '_id',
                key: '_id',
                // render:(d)=>{
                //     return parseInt(d,16);
                // }
            },
            {
                title: '订单金额',
                dataIndex: 'amount',
                key: 'amount',
                render:(d)=>{
                    return utils.currencyFormatter(d);
                },
                sorter:true
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                render:(d)=>{
                    return utils.dateFormatter(d);
                },
                sorter:true
            },
            {
                title: '订单状态',
                dataIndex: 'state',
                key: 'state',
                render:(d)=>{
                    // return stateMap[d];
                    return stateArr.find(el=>el.key==d).value;
                }
            },
            
        ];



        return (
            <div>
                <h3>订单列表</h3>

                <Row gutter={20}>
                    
                    <Col span={6}>
                        <Form.Item
                            label="订单状态"
                        >
                            <Select value={this.state.stateCondition} onChange={e=>{
                                this.setState({stateCondition:e})
                            }}>
                                {
                                    stateArr.map(el=>{
                                        return <Option 
                                            value={el.key}
                                            key={el.key}
                                        >{el.value}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="开始时间"
                        >
                            <DatePicker 
                                onChange={this.onStartTimeChange} 
                                
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="截止时间"
                        >
                            <DatePicker 
                                onChange={this.onEndTimeChange} 

                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col>
                        <Button type="primary" icon={<ClearOutlined />} onClick={e=>{
                            this.setState({
                                stateCondition:"",
                                startTimeCondition:"",
                                endTimeCondition:""
                            });
                            setTimeout(() => {
                                this.getPage();
                            }, 40);
                            
                        }}>
                            重置
                        </Button>
                    </Col>
                    <Col>
                        <Button type="primary" icon={<SearchOutlined />} onClick={e=>{
                            this.getPage();
                        }}>
                            搜索
                        </Button>
                    </Col>
                        
                    
                </Row>

                <Table 
                    columns={columns} 
                    dataSource={this.props.orderList} 
                    rowKey="_id"
                    // pagination={false}
                    pagination={{
                        position:["bottomRight","topLeft"],
                        total:this.state.total,
                        current:this.state.current,
                        pageSize:this.state.pageSize,
                        // onChange:this.pageChange
                    }}
                    onChange={this.pageChange}
                />
            </div>
        )
    }

    constructor(props){
        super(props);

        this.state = {
            total:0,
            current:1,
            pageSize:10,

            stateCondition:"",
            startTimeCondition:"",
            endTimeCondition:"",

            sortBy:"",
            sortType:1
        }

        this.bindAll([
            "pageChange",
            "onStartTimeChange",
            "onEndTimeChange"
        ]);
    }

    onStartTimeChange(e){
        // console.log(e.format("yyyy-MM-DD"));
        this.setState({
            startTimeCondition:e?e.format("yyyy-MM-DD"):null
        });
    }

    onEndTimeChange(e){
        this.setState({
            endTimeCondition:e?e.format("yyyy-MM-DD"):null
        });
    }



    componentDidMount(){
        this.getPage();
    }

    getPage(n) {
        if(!n){
            n=0
        }
        let searchCondition = {};
        if(this.state.stateCondition){
            searchCondition.state = this.state.stateCondition;
        }
        if(this.state.startTimeCondition){
            searchCondition.startTime = this.state.startTimeCondition;
        }
        
        if(this.state.endTimeCondition){
            searchCondition.endTime = this.state.endTimeCondition;
        }

        if(this.state.sortBy){
            searchCondition.sortBy = this.state.sortBy;
            searchCondition.sortType = this.state.sortType;
        }


        // console.log(n);
        // console.log(n * this.state.pageSize);

        this.props.queryOrderList({
            offset: n * this.state.pageSize,
            size:this.state.pageSize,
            ...searchCondition
        })
        .then(res => {
            console.log(res);
            
            this.setState({
                total:res.data.totalCount,
                current:res.data.currentPage+1
            })
        })
    }

    pageChange(p,f,s){

        console.log(p);
        // console.log(s);
        this.setState({
            pageSize:p.pageSize
        });

        if(!s.order){
            this.setState({
                sortBy:"",
            })
        }else{
            this.setState({
                sortBy:s.field,
                sortType:s.order==="ascend"?1:-1
            });
        }

        setTimeout(() => {
            this.getPage(p.current - 1);
        }, 40);
        
        // this.getPage(e-1);
    }
}

function mapState(state) {
    return {
        orderList: state.orderList
    }
}
function mapAction(dispatch, ownProps) {

    return {
        
        queryOrderList(params) {
            return dispatch(queryOrderList(params));
        }
    }
}
OrderList = connect(mapState, mapAction)(OrderList);

export default OrderList;


