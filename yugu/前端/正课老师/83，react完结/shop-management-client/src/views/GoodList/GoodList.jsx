
import React from "react";
import "./GoodList.css";

import { connect } from "react-redux";
import {
    queryGoodList,
    queryCateList,
    queryEditGood
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
    Button
} from "antd";


import {
    SearchOutlined,
    ClearOutlined,
} from "@ant-design/icons"

import utils from "../../utils/utils.js";


let {Option} = Select;


class GoodList extends React.Component {
    render() {
        const columns = [
            {
                title: '商品',
                width:100,
                dataIndex: 'image',
                key:"image",
                render(d){
                    return (<img className="GoodList-good-img" alt="" src={d}/>)
                },
                fixed: 'left',
            },
            {
                title: '商品名称',
                width: 200,
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
                // ellipsis: true,
                textWrap: 'word-break',
                className:"GoodList-name-col"
            },
            {width: 100, title: '分类', dataIndex: ["category","name"], key: 'category' },
            { 
                title: '价格', 
                width: 100,
                dataIndex: 'price', 
                key: 'price',
                render(d){
                    return utils.currencyFormatter(d);
                },
                sorter:true
                
            },
            { width: 100, title: '库存', dataIndex: 'number', key: 'number',sorter:true },
            { 
                width: 300, 
                title: '商品介绍', 
                dataIndex: 'introduce', 
                key: 'introduce',
                // render(e){
                //     return <div dangerouslySetInnerHTML={{
                //         __html:e
                //     }}></div>
                // },
                ellipsis: true,
            },
            {width: 100, title: '创建者', dataIndex: ['creator',"account"], key: 'creator' },
            { 
                width: 130,
                title: '创建时间', 
                dataIndex: 'createTime', 
                key: 'createTime', 
                render(e){
                    return utils.dateFormatter(e);
                }
            },
            { 
                width: 500,
                title: '轮播图', 
                dataIndex: 'images', 
                key: 'images' ,
                render(d){
                    return (
                        d.map((el,i)=><img key={i} className="GoodList-good-img" alt="" src={el}/>)
                    )
                }
            },
            { 
                title: '规格', 
                dataIndex: 'spec', 
                key: 'spec' ,
                render(d){
                    return(
                        d.map((el,i)=><div key={i}>
                            <Tag>{el.name}</Tag>
                            <Tag>{"库存:"+el.number}</Tag>
                            <Tag>{"价格"+el.price}</Tag>
                            <hr/>
                        </div>)
                        
                    )
                }
            },
            
            {
                title: '上架',
                dataIndex: 'isOnSell', 
                key: 'isOnSell',
                fixed: 'right',
                width: 100,
                render: (d,good) => <Switch 
                    defaultChecked={d}
                    onChange={e=>{
                        this.props.queryEditGood({
                            _id:good._id,
                            isOnSell:e
                        });
                    }}
                ></Switch>,
            },
        ];

        return (
            <div>
                <h3>所有商品</h3>

                <Row gutter={20}>
                    <Col span={6}>
                        <Form.Item
                            label="商品名称"
                        >
                            <Input allowClear value={this.state.nameCondition} onChange={e=>{
                                // console.log(e.target.value);
                                this.setState({nameCondition:e.target.value})
                            }}/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="商品分类"
                        >
                            <Select value={this.state.categoryCondition} onChange={e=>{
                                this.setState({categoryCondition:e})
                            }}>
                                {
                                    this.props.cateList.map(el=>{
                                        return <Option 
                                            value={el._id}
                                            key={el._id}
                                        >{el.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="是否上架"
                        >
                            <Select value={this.state.isOnSellCondition} onChange={e=>{
                                this.setState({isOnSellCondition:e})
                            }}>
                                <Option value="123">不限</Option>
                                <Option value={true}>上架</Option>
                                <Option value={false}>下架</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col>
                        <Button type="primary" icon={<ClearOutlined />} onClick={e=>{
                            this.setState({
                                nameCondition:"",
                                categoryCondition:"",
                                isOnSellCondition:"123"
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



                {/* <Pagination defaultCurrent={1} total={this.state.total} current={this.state.current} pageSize={this.state.pageSize}/> */}
                <Table 
                    columns={columns} 
                    dataSource={this.props.goodList} 
                    scroll={{ x: 2000 }} 
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
                {/* <Pagination defaultCurrent={1} total={this.state.total} current={this.state.current}  pageSize={this.state.pageSize}/> */}
            </div>
        )
    }

    constructor(props) {
        super(props);

        this.state = {
            total:0,
            current:1,
            pageSize:5,

            nameCondition:"",
            categoryCondition:"",
            isOnSellCondition:"123",

            sortBy:"",
            sortType:1
        }


        this.bindAll([
            "getPage",
            "pageChange"
        ]);
    }

    componentDidMount() {
        this.getPage();

        this.props.queryCateList();
    }


    getPage(n) {
        if(!n){
            n=0
        }
        let searchCondition = {};
        if(this.state.nameCondition){
            searchCondition.name = this.state.nameCondition;
        }
        if(this.state.categoryCondition){
            searchCondition.category = this.state.categoryCondition;
        }
        
        if(this.state.isOnSellCondition!=="123"){
            searchCondition.isOnSell = this.state.isOnSellCondition;
        }

        if(this.state.sortBy){
            searchCondition.sortBy = this.state.sortBy;
            searchCondition.sortType = this.state.sortType;
        }


        // console.log(n);
        // console.log(n * this.state.pageSize);

        this.props.queryGoodList({
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

        // console.log(p);
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
        goodList: state.goodList,
        cateList: state.cateList
    }
}
function mapAction(dispatch, ownProps) {

    return {
        queryGoodList(params) {
            return dispatch(queryGoodList(params));
        },
        queryCateList(params) {
            return dispatch(queryCateList(params));
        },
        queryEditGood(params) {
            return dispatch(queryEditGood(params));
        }
    }
}
GoodList = connect(mapState, mapAction)(GoodList);

export default GoodList;
