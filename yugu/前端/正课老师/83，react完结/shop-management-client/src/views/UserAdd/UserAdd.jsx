
import React from "react";
import "./UserAdd.css";

import { 
    Form, 
    Input, 
    Button,
    Checkbox,
    message,
} from 'antd';


import {
    queryAddUser,
    
} from "../../store/asyncAction.js";

import {connect} from "react-redux";

const CheckboxGroup = Checkbox.Group;


// let plainOptions = ["good","category","swiper","order"];
let plainOptions = [
    {
        label:"商品管理",
        value:"good"
    },
    {
        label:"分类管理",
        value:"category"
    },
    {
        label:"轮播图管理",
        value:"swiper"
    },
    {
        label:"订单管理",
        value:"order"
    },
];

class UserAdd extends React.Component{
    render(){
        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 14 },
        };
        return (
            <div>
                <h3>添加普通用户</h3>
                <Form 
                    {...layout} 
                    onFinish={this.formSubmit} 
                    ref={this.form}
                    
                >
                    <Form.Item name={"account"} label="账号名称" rules={[{ 
                        required: true, 
                        message: '账号不能为空!' 
                    }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="密码">
                        新用户初始密码为123456，创建之后请立刻修改密码。
                    </Form.Item>

                    <Form.Item label="全选">
                        <Checkbox
                            checked={this.state.role.length>=4}
                            onChange={e=>{
                                console.log(e.target.checked);
                                if(e.target.checked){
                                    this.setState({role:["good","category","swiper","order"]});
                                }else{
                                    this.setState({role:[]});
                                }
                                
                            }}
                            indeterminate={this.state.role.length>0&&this.state.role.length<4}
                        />
                    </Form.Item>

                    <Form.Item label="账号权限">
                        <CheckboxGroup
                            options={plainOptions}
                            value={this.state.role}
                            onChange={e=>{
                                this.setState({role:[...e]});
                            }}
                        />
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

        this.form = React.createRef();

        this.state = {
            role:[]
        }

        this.bindAll(["formSubmit"]);
    }

    formSubmit(e){
        console.log(e);
        if(this.state.role.length<=0){
            message.error("至少选择一个权限");
            return; 
        }

        this.props.queryAddUser({
            ...e,
            role:this.state.role
        })
        .then(res=>{
            if(!res.data.err){
                this.form.current.resetFields();
                this.setState({role:[]})
            }
        })
    }
}

function mapState(state) {
    return {
        
    }
}
function mapAction(dispatch, ownProps) {

    return {
        queryAddUser(params) {
            return dispatch(queryAddUser(params));
        },
        
    }
}
UserAdd = connect(mapState, mapAction)(UserAdd);

export default UserAdd;
