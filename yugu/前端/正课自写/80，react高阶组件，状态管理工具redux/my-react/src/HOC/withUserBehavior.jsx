import React from 'react'
//高阶组件（higher order component ,HOC）,可以实现组件逻辑的复用
//高阶组件一般存储在src下面的HOC文件夹中，名字以with开头，后面跟具体功能。withXxxx

//高阶组件本身不是一个组件，而是一个函数,WrappedComponent被包裹的组件
//高阶组件函数的第二个参数开始可以自定义传参，对于复用逻辑中不同的部分，可以通过传参进行区分。
function withUserBehavior(WrappedComponent) {
    //高阶组件函数需要返回一个新的组件（类组件）
    return class extends React.Component {
        render() {
            //高阶组件的模板内容直接使用被包裹的组件
            return (
                //在模板中使用待扩展的组件标签是，需要把自己无关的props都继续往下传递，否则待扩展的组件不会接收到传值。
                <WrappedComponent {...this.props}></WrappedComponent>
            )
        }
        
        constructor(props) {
            super(props);
            this.enterTime = undefined;
        }
        componentDidMount() {
            // console.log("withUserBehavior的mounted");
            // console.log(this);
            
            console.log("用户进入");
            this.enterTime = Date.now();
        }
        componentWillUnmount() {
            // console.log("withUserBehavior的unmounted");
            console.log("用户离开");
            let leaveTime = Date.now();
            let t = leaveTime - this.enterTime;
            console.log(`用户离开了，一共停留了${Math.floor(t / 1000)}秒`);
        }
    }
}
export default withUserBehavior;