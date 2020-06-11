
import React from "react";
import "./CateEdit.css";


import { connect } from "react-redux";
import { 
    queryCategory,
    queryEditCate
} from "../../store/asyncAction.js";

import { 
    Form, 
    Input, 
    Button, 
    Switch
} from 'antd';

import qs from "qs";

class CateEdit extends React.Component{
    render(){
        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 14 },
        };
        return (
            <div>
                <h3>编辑分类</h3>

                {this.state.cate&&(
                    <Form 
                        {...layout} 
                        onFinish={this.categorySubmit} 
                        ref={this.form}
                        initialValues={{
                            name:this.state.cate.name,
                            introduce:this.state.cate.introduce,
                            available:this.state.cate.available
                        }}

                    >
                        <Form.Item name={"name"} label="分类名称" rules={[{ 
                            required: true, 
                            message: '分类名称不能为空!', 
                        }]}>
                            <Input />
                        </Form.Item>
                        
                        <Form.Item name={"introduce"} label="分类介绍" rules={[{ 
                            required: true, 
                            message: '分类介绍不能为空!' 
                        }]}>
                            <Input.TextArea  />
                        </Form.Item>

                        <Form.Item 
                            name={"available"} 
                            label="可用" 
                            wrapperCol={{ offset: 0 }}
                            valuePropName="checked"
                        >
                            <Switch></Switch>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 16 }}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                )}

                

            </div>
        )
    }

    constructor(props){
        super(props);

        this.state = {
            cate:null
        }


        this.bindAll([
            "categorySubmit",
        ]);
    }

    componentDidMount(){
        // console.log(this.props);
        
        let {search} = this.props.location;
        // console.log(qs.parse(search,{ ignoreQueryPrefix: true }));
        let {_id} = qs.parse(search,{ ignoreQueryPrefix: true });

        this.props.queryCategory({
            _id:_id
        })
        .then(res=>{
            console.log(res);
            this.setState({
                cate:res.data.data
            });
        })
    }

    categorySubmit(e){
        let params = {
            _id:this.state.cate._id,
            ...e
        }
        this.props.queryEditCate(params)
        
    }
}

function mapState(state) {
    return {
        
    }
}
function mapAction(dispatch, ownProps) {

    return {
        queryCategory(params) {
            return dispatch(queryCategory(params));
        },
        queryEditCate(params){
            return dispatch(queryEditCate(params));
        }
    }
}
CateEdit = connect(mapState, mapAction)(CateEdit);

export default CateEdit;
