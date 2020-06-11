
import React from "react";
import "./GoodAdd.css";


import { 
    Form, 
    Input, 
    Button,
    InputNumber,
    Upload,
    Select,
    Tooltip,
    Modal,
    Table,
    Row,
    Col
} from 'antd';

import {
    RedoOutlined,
    PlusOutlined,
    DeleteTwoTone,
    // PlusOutlined
} from "@ant-design/icons"

import {connect} from "react-redux";

import RcWangEditor from 'rc-wang-editor';
import {
    queryCateList,
    uploadOne,
    uploadMany,
    queryAddGood
} from "../../store/asyncAction.js";


let {Option} = Select;

class GoodAdd extends React.Component{
    render(){
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
                <h3>添加商品</h3>

                <Form 
                    {...layout} 
                    onFinish={this.formSubmit} 
                    ref={this.goodForm}
                    // initialValues={{
                    //     image:this.state.image,
                    //     images:this.state.images
                    // }}
                >
                    <Form.Item name={"name"} label="商品名称" rules={[{ 
                        required: true, 
                        message: '商品名称不能为空!' 
                    }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={"number"} label="商品库存" rules={[{ 
                        required: true, 
                        message: '商品库存不能为空!' 
                    }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={"price"} label="商品价格" rules={[{ 
                        required: true, 
                        message: '商品价格不能为空!' 
                    }]}>
                        <InputNumber min={0} step={0.1} />
                    </Form.Item>

                    <Form.Item 
                        name={"introduce"} 
                        label="商品描述" 
                        rules={[{ 
                            required: true, 
                            message: '商品描述不能为空!' 
                        }]}
                        
                    >
                        <RcWangEditor></RcWangEditor>
                    </Form.Item>

                    <Form.Item 
                        name="image"
                        label="商品图片" 
                        rules={[{ 
                            required: true, 
                            message: '商品图片不能为空!' 
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

                    <Form.Item 
                        name="images"
                        label="商品轮播图" 
                        rules={[
                            { 
                                required: true, 
                                message: '' 
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (value&&value.length>=2) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('图片至少2张');
                                },
                            })
                        ]}
                        valuePropName="fileList"
                        getValueFromEvent={e => {
                            // console.log('Upload event:', e);
                            if (Array.isArray(e)) {
                              return e;
                            }
                            return e && e.fileList;
                        }}
                    >
                        <Upload
                            // name="images2"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={true}
                            onChange={this.imagesChange}
                            customRequest={()=>{}}
                            fileList={this.state.images}
                            multiple={true}
                        >
                            { 
                                this.state.images.length<9&&
                                uploadButton
                            }
                        </Upload>
                    </Form.Item>

                    <Form.Item 
                        label="刷新分类" 
                    >
                        <Button
                            type="primary"
                            icon={<RedoOutlined />}
                            onClick={this.refreshCategorys}
                        ></Button>
                        
                    </Form.Item>
                    
                    
                    <Form.Item 
                        name={"category"} 
                        label="商品分类" 
                    >
                        <Select style={{ width: 150 }}>
                            {
                                this.props.cateList.map(el=>{
                                    return <Option 
                                        value={el._id}
                                        key={el._id}
                                        disabled={!el.available}
                                    >{el.name}</Option>
                                })
                            }

                        </Select>
                    </Form.Item>
                    
                    {
                        this.state.specs.length>0&&
                        <Row>
                            <Col offset="3" span="21">
                            <Table 
                                rowKey="name"
                                dataSource={this.state.specs} 
                                pagination={false}
                                columns={[
                                    {
                                        title:"规格名称",
                                        dataIndex: 'name',
                                        key: 'name',
                                    },
                                    {
                                        title:"规格库存",
                                        dataIndex: 'number',
                                        key: 'number',
                                    },
                                    {
                                        title:"规格价格",
                                        dataIndex: 'price',
                                        key: 'price',
                                    },
                                    {
                                        title:"删除",
                                        key:"delete",
                                        render:(d,cate,i)=>{
                                            return (
                                                <DeleteTwoTone 
                                                    className="GoodAdd-delete-btn"
                                                    onClick={()=>{
                                                        // console.log(i);
                                                        this.state.specs.splice(i,1);
                                                        this.setState({specs:[...this.state.specs]});
                                                    }}
                                                />
                                            )
                                        }
                                    }
                                ]} 
                            />
                            </Col>
                        </Row>
                        
                    }
                
                    
                    <Form.Item 
                        label="添加规格" 
                    >
                        <Tooltip title="点击添加规格">
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={this.toggleAddSpec}
                        ></Button>
                        </Tooltip>
                        
                    </Form.Item>
                        

                    <Form.Item wrapperCol={{ offset: 16 }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
                
                
                

                <Modal
                    zIndex={10000000}
                    title="添加规格"
                    visible={this.state.showAddSpec}
                    onOk={this.submitSpecForm}
                    onCancel={()=>{
                        this.setState({showAddSpec:false})
                    }}
                >
                    <Form 
                        labelCol= {{ span: 8 }}
                        wrapperCol= {{ span: 16 }}
                        ref={this.specForm}
                        onFinish={this.addSpec}
                    >
                        <Form.Item name={"name"} label="规格名称" rules={[{ 
                            required: true, 
                            message: '规格名称不能为空!' 
                        }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={"number"} label="规格库存" rules={[{ 
                            required: true, 
                            message: '规格库存不能为空!' 
                        }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={"price"} label="规格价格" rules={[{ 
                            required: true, 
                            message: '规格价格不能为空!' 
                        }]}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }

    constructor(props){
        super(props);

        this.state = {
            image:[],
            images:[],
            showAddSpec:false,
            specs:[]
        }

        this.specForm = React.createRef();
        this.goodForm = React.createRef();

        this.bindAll([
            "imageChange",
            "imagesChange",
            "refreshCategorys",
            "formSubmit",
            "toggleAddSpec",
            "addSpec",
            "submitSpecForm"
        ]);
    }

    componentDidMount(){
        this.refreshCategorys();
    }

    refreshCategorys(){
        this.props.queryCateList();
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

    imagesChange(e){
        console.log(e);
        let fl = e.fileList.slice();
        
        if(fl.length>9){
            fl = fl.slice(0,9);
        }

        fl.forEach(el=>{
            el.status = "done";
        });

        this.setState({
            images:fl
        });
    }

    toggleAddSpec(){
        this.setState({showAddSpec:true});
    }

    submitSpecForm(){
        // console.log(this.specForm.current);
        this.specForm.current.submit();
    }

    addSpec(e){
        console.log(e);
        let temp = this.state.specs.slice();
        temp.push(e);
        this.setState({
            specs:temp,
            showAddSpec:false
        });
        this.specForm.current.resetFields();
    }

    formSubmit(e){
        console.log(e);
        
        let {image,images,name,number,price,introduce,category} = e;
        // console.log(image[0].originFileObj);
        

        // 商品图片请求
        let fd1 = new FormData();
        fd1.append("img",image[0].originFileObj);
        let p1 = this.props.uploadOne(fd1);

        // 商品轮播图请求
        let fd2 = new FormData();
        images.forEach(el=>{
            fd2.append("img",el.originFileObj);
        });
        let p2 = this.props.uploadMany(fd2);

        Promise.all([p1,p2])
        .then(ress=>{
            let goodImg = ress[0].data.fileUrl;
            let goodSwiperImg = ress[1].data.fileUrl;
            // console.log(goodImg);
            // console.log(goodSwiperImg);

            let params = {
                name,
                number,
                price,
                introduce,
                image:goodImg,
                images:goodSwiperImg,
                // category,
                // spec:this.state.specs
            }
            if(category){
                params.category = category;
            }
            if(this.state.specs.length>0){
                params.spec = this.state.specs;
            }

            return this.props.queryAddGood(params);
            
        })
        .then(res=>{
            if(!res.data.err){
                this.goodForm.current.resetFields();
                this.specForm.current.resetFields();
                this.setState({
                    image:[],
                    images:[],
                    specs:[]
                })
            }
        })

        .catch(err=>{
            
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
        uploadOne(params,config) {
            return dispatch(uploadOne(params,config));
        },
        uploadMany(params,config) {
            return dispatch(uploadMany(params,config));
        },
        queryAddGood(params) {
            return dispatch(queryAddGood(params));
        },
    }
}
GoodAdd = connect(mapState, mapAction)(GoodAdd);


export default GoodAdd;
