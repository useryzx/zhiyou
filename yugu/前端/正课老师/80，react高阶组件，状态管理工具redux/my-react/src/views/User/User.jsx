
import React from "react";
import "./User.css";

import withUserBehavior from "../../HOC/withUserBehavior.jsx";
import withFetchData from "../../HOC/withFetchData.jsx";


// 在组件中使用仓库数据时，需要先导入react-redux中的connect函数
import {connect} from "react-redux";


// 导入本组件需要使用的action的工厂函数。
import {
    numIncrease,
    setStr,
    queryObj
} from "../../store/actions.js";

class User extends React.Component{
    render(){
        return (
            <div>
                <h1>用户中心</h1>
                {this.props.data&&<p>{this.props.data.msg}</p>}
                <p>{this.props.num}</p>
                <button onClick={this.props.increase}>+</button>

                <p>{this.props.str}</p>
                <input type="text" value={this.props.str} onChange={this.strChange}/>

                <p>{this.props.obj.err}</p>
                <p>{this.props.obj.msg}</p>
            </div>
        )
    }

    constructor(props){
        super(props);

        this.bindAll(["strChange"]);
    }

    componentDidMount(){
        console.log(this);

        this.props.queryObj()
        .then(res=>{
            console.log(res);
        })
    }

    strChange(e){
        let t = e.target.value;
        this.props.setStr(t);
    }
}

User = withUserBehavior(User,"用户中心");
// User = withFetchData(User,"/data2.json");

// 从仓库中读取数据，需要准备一个mapState函数，其中返回一个对象用于设置从仓库中读取哪些数据。
function mapState(state){
    return {
        num:state.num,
        str:state.str,
        obj:state.obj
    }
}

// 修改仓库中的数据，需要提交action对象，action对象的创建应该有action的工厂函数完成。
// mapAction函数中设置本组件需要使用的action都有哪些
function mapAction(dispatch,ownProps){
    // dispatch参数是一个函数，用于提交action
    return {
        increase(){
            let action = numIncrease()
            dispatch(action);
        },
        setStr(v){
            dispatch(setStr(v));
        },
        queryObj(){
            return dispatch(queryObj());
        }
    }
}


// 使用connect函数创建store的高阶组件(负责从仓库中读取数据并传递给当前组件)，并与当前组件结合。
// let storeHoc = connect(mapState);
// User = storeHoc(User);
User = connect(mapState,mapAction)(User);


export default User;

