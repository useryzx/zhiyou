
import React from "react";
import "./SwiperEdit.css";

import { connect } from "react-redux";
import {
    queryAddSwiper,
    querySwiperList,
    uploadOne,
    queryDeleteSwiper
} from "../../store/asyncAction.js";


import { 
    Form, 
    Input, 
    Button,
    Upload,
    Table,
    Modal,
    message
} from 'antd';

import {
    
    PlusOutlined,
    DeleteTwoTone,
    QuestionCircleOutlined
    
} from "@ant-design/icons"

class SwiperEdit extends React.Component{
    render(){
        const columns = [
            {
                title: '图片',
                dataIndex: 'img',
                key:"img",
                render(d){
                    return (<img className="image-in-table" alt="" src={d}/>)
                },
                
            },
            { 
                title: '链接地址', 
                dataIndex: 'url', 
                key: 'url' ,
                render(d){
                    return(
                        <a href={d}>{d}</a>
                    )
                }
            },
            {
                title: '删除',
                dataIndex: '', 
                key: 'delete',
                render: (d,swiper) => (
                    
                    <DeleteTwoTone 
                        style={{cursor:"pointer",fontSize:"30px"}}
                        onClick={()=>{
                            this.deleteSwiper(swiper._id);
                        }}
                    />
                ),
            },
        ];

        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 14 },
        };
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">选择图片</div>
            </div>
        );
        return (
            <div>
                <h3>轮播图管理</h3>

                <Table 
                    columns={columns} 
                    dataSource={this.props.swiperList} 
                    rowKey="_id"
                    pagination={false}
                    style={{marginBottom:"20px"}}
                />

                <h3>添加轮播图</h3>

                <Form 
                    {...layout} 
                    onFinish={this.formSubmit} 
                    ref={this.form}
                    
                >
                    <Form.Item 
                        name="image"
                        label="轮播图片" 
                        rules={[{ 
                            required: true, 
                            message: '图片不能为空!' 
                        }]}
                        valuePropName="fileList"
                        getValueFromEvent={e => {
                            if (Array.isArray(e)) {
                              return e;
                            }
                            return e && e.fileList;
                        }}
                    >
                        <Upload
                            name="image2"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            onChange={this.imageChange}
                            customRequest={()=>{}}
                            fileList={this.state.image}
                        >
                            { 
                                this.state.image.length>0?
                                <img 
                                    src={URL.createObjectURL(this.state.image[0].originFileObj)}
                                    className="GoodAdd-pic"
                                    alt=""
                                />:
                                uploadButton
                            }
                        </Upload>
                    </Form.Item>

                    <Form.Item name={"url"} label="链接地址" rules={[{ 
                        required: true, 
                        message: '链接地址不能为空!' 
                    }]}>
                        <Input />
                    </Form.Item>

                    
                    <Form.Item wrapperCol={{ offset: 16 }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        )
    }

    constructor(props){
        super(props);

        this.state = {
            image:[]
        }

        this.form = React.createRef();

        this.bindAll([
            "imageChange",
            "formSubmit"
        ]);
    }
    componentDidMount(){
        this.props.querySwiperList();
    }

    imageChange(e){
        
        let fl = [];
        if(e.fileList.length>1){
            fl = [e.fileList[e.fileList.length-1]];
        }else{
            fl = [...e.fileList]
        }
        
        this.setState({
            image:fl
        });
    }

    formSubmit(e){
        let {image,url} = e;

        console.log(e);
        if(this.props.swiperList.length>=8){
            message.error("轮播图不能超过8张");
            return;
        }

        let fd1 = new FormData();
        fd1.append("img",image[0].originFileObj);
        this.props.uploadOne(fd1)
        .then(res=>{
            let img = res.data.fileUrl;

            return this.props.queryAddSwiper({
                img,
                url
            })
        })
        .then(res=>{
            if(!res.data.err){
                this.form.current.resetFields();
                this.setState({
                    image:[]
                })
                this.props.querySwiperList();
            }
        });
    }

    deleteSwiper(_id){
        console.log(_id);
        Modal.confirm({
            icon:<QuestionCircleOutlined />,
            content:"确定删除吗？",
            onOk:()=> {
                this.props.queryDeleteSwiper({_id})
                .then(res=>{
                    if(!res.data.err){
                        this.props.querySwiperList();
                    }
                })
            },
            onCancel() {
                
            }
        })
    }
}

function mapState(state) {
    return {
        swiperList: state.swiperList,
    }
}
function mapAction(dispatch, ownProps) {

    return {
        queryAddSwiper(params) {
            return dispatch(queryAddSwiper(params));
        },
        
        querySwiperList(params) {
            return dispatch(querySwiperList(params));
        },

        uploadOne(params) {
            return dispatch(uploadOne(params));
        },

        queryDeleteSwiper(params) {
            return dispatch(queryDeleteSwiper(params));
        },

    }
}
SwiperEdit = connect(mapState, mapAction)(SwiperEdit);

export default SwiperEdit;
