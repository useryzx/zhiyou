
import React from "react";
import "./Setting.css";

class Setting extends React.Component{
    render(){
        return (
            <div>
                <h1>设置</h1>
            </div>
        )
    }

    constructor(props){
        super(props);


    }

    componentDidMount(){
        // 路由传参的数据也在组件对象的props中
        // console.log(this.props.match.params);

    }
}

export default Setting;
