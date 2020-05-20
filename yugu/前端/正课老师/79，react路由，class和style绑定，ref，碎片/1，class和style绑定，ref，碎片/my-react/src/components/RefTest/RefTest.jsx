
import React from "react";
import "./RefTest.css";

class RefTest extends React.Component{
    render(){
        return (
            <div>
                <button onClick={this.btnClick}>点击获取P标签</button>
                {/* 2，在相关的标签上添加ref属性，值设置为ref对象 */}
                <p ref={this.qwe}>123123</p>


                {/* ref属性如果写在普通的html标签上，ref.current得到的是原生的标签对象。如果写在组件
                标签上，如果是类组件，会得到组件的实例对象，如果是函数组件则为空，因为函数组件仅仅是一个
                模板，没有实例化的组件对象 */}
                <p>{this.state.num}</p>
            </div>
        )
    }

    constructor(props){
        super(props);

        // 1，当组件的方法中需要使用组件模板中的某个原生元素对象时，需要先React.createRef()创建一个ref对象。
        this.qwe = React.createRef();

        this.btnClick = this.btnClick.bind(this);


        this.state = {
            num:99,
        }
    }

    btnClick(){
        // 3，在组件方法中可以通过this.xxxxx.current访问原生标签对象。
        console.log(this);
        
        //react组件的setState方法是异步的。所以setState修改某个数据之后立刻访问这个数据不会得到修改之后的值
        // this.setState({
        //     num:this.state.num + 1,
        // });
        // console.log(this.state.num);//99

        let num2 = this.state.num;
        num2++;
        this.setState({
            num:num2,
        });
        console.log(num2);//100


    }
}

export default RefTest;
