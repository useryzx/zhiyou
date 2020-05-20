
import React from "react";
import "./Home.css";

class Home extends React.Component{
    render(){
        return (
            <div>
                <h1>首页</h1>
                <button onClick={this.btnClick}>前往用户页面</button>
            </div>
        )
    }

    constructor(props){
        super(props);

        this.btnClick = this.btnClick.bind(this);
    }

    btnClick(){
        console.log(this);
        // 使用this.props.history可以实现代码跳转
        this.props.history.push("/user");
    }

}

export default Home;
