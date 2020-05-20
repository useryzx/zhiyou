// react函数组件只能生命组件的模板和使用传值，不能使用组件的数据、方法、生命周期函数等。
// 要设计一个完整的组件，需要使用类声明组件。

import React from "react";
import "./NumCtrl.css";


// react声明一个组件需要 声明一个类并且继承于React.Component类
class NumCtrl extends React.Component{

    // 组件类的构造函数，构造函数的参数是组件接收的传值
    constructor(props){
        // 构造函数中要先通过super调用父类构造函数。
        super(props);
        console.log(props);

        // 构造函数中的this就是正在创建的组件
        // console.log(this);

        // 组件对象中的props属性中记录的是组件接收的传值。
        // console.log(this.props);
        // 组件对象的state属性中存储组件的数据
        this.state = {
            txt:"hello",
            age:99
        }
    }

    // 通过组件类的render方法设置组件的模板，render函数返回组件的模板
    render(){
        return (
            <div>
                <div>
                    {/* react组件模板中使用onXxxxx绑定时间，和原生方法类似，但是名字使用的是驼峰命名 */}
                    {/* 格式  onXxxxx={this.yyyyyy} */}
                    {/* <button onClick={this.btnClick}>-</button> */}


                    {/* react标签事件绑定方法名后不能加(),如果要自定义传参，需要嵌套
                    一层箭头函数，在箭头函数中进行组件方法调用，就可以传参 */}
                    <button onClick={e=>{
                        this.btnClick("-");
                    }}>-</button>

                    {/* 组件中可以使用传值数据，格式  {this.props.xxxx} */}
                    <span>{this.props.value}</span>
                    <button onClick={e=>{
                        this.btnClick("+");
                    }}>+</button>

                    
                </div>
                {/* 组件的模板中可以使用组件的数据，格式  {this.state.xxxx} */}
                <p>文本:{this.state.txt},年龄:{this.state.age}</p>
            </div>
        )
    }

    // 组件的方法直接写在组件类中
    btnClick(s){
        // 子组件中不能直接修改父组件传值的数据，必须通过父组件传递的放进进行修改。
        if(s==="-"){
            this.props.setNum(this.props.value-1);
        }else if(s==="+"){
            this.props.setNum(this.props.value+1);
        }
    }


}


export default NumCtrl;

