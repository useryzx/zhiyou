
import React from "react";
import "./MyCom.css";

class MyCom extends React.Component{
    render(){
        return (
            <div>
                {/* react的模板中标签的style属性可以绑定一个对象 */}
                <p style={this.txtStyleObj()}>react的模板中标签的style属性可以绑定一个对象</p>

                {/* className不能直接绑定数组，可以通过数组.join转为字符串之后绑定 */}
                <p className={this.txtClassArr()}>className不能直接绑定数组，可以通过数组.join转为字符串之后绑定</p>

                {/* className也不能直接绑定对象，需要将对象转为字符串之后绑定 */}
                <p className={this.txtClassObj()}>className能不能绑定对象</p>
            </div>
        )
    }

    constructor(props){
        super(props);

        this.state = {
            color:"#ff0000"
        }


        this.txtStyleObj = this.txtStyleObj.bind(this);
    }

    txtStyleObj(){
        return {
            color:this.state.color,
            fontSize:"30px",
            // "font-weight":"bold"
            fontWeight:"bold"
        }
    }

    txtClassArr(){
        return ["pink-color","bold","yellow-bg"].join(" ");
    }


    txtClassObj(){
        let o = {
            "pink-color":true,
            bold:true,
            "yellow-bg":false
        }
        let arr = [];
        for(let k in o){
            if(o[k]){
                arr.push(k);
            }
        }
        return arr.join(" ");
    }
}

export default MyCom;
