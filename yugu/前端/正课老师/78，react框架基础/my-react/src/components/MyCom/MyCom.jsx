import React from "react";
import "./MyCom.css";


// 函数组件的函数体必须返回一个模板，函数组件也可以通过参数使用组件的传值。
export default function (props){
    // console.log(arguments);
    return (
        <div>
            <h1 className="MyCom-title">这是MyCom组件</h1>
            <p>hello world</p>
            <p>{props.str}</p>
            <p>{props.num}</p>
        </div>
    )
}