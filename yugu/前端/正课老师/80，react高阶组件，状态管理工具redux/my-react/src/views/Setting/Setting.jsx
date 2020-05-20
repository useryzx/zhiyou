
import React from "react";
import "./Setting.css";

import withUserBehavior from "../../HOC/withUserBehavior.jsx";
import withFetchData from "../../HOC/withFetchData.jsx";

class Setting extends React.Component{
    render(){
        return (
            <div>
                <h1>设置页面</h1>
                {this.props.data&&<p>{this.props.data.msg}</p>}
                
            </div>
        )
    }

    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log(this);
    }

}

// 一个组件可以结合多个高阶组件
Setting = withUserBehavior(Setting,"设置");
Setting = withFetchData(Setting,"/data1.json");

export default Setting;
