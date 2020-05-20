import React from "react";


// 高阶组件(higher order component,HOC)，可以实现组件逻辑的复用。
// 高阶组件一般存储在src下的HOC文件夹中，名字以with开头，后面跟具体功能。withXxxxxxx


// 高阶组件本身不是一个组件，而是一个函数。函数有一个参数，WrappedComponent(被包裹的组件)

// 高阶组件函数的第二个参数开始，可以自动以传参，对于复用逻辑中不同的部分，可以通过传参进行区分。
function withUserBehavior(WrappedComponent,page){
    // 高阶组件函数需要返回一个新的组件(类组件)

    return class extends React.Component{
        render(){
            // 高阶组件的模板内容直接使用被包裹的组件，
            return (
                // 在模板中使用待扩展的组件标签时，需要把和自己无关的props都继续向下传递，否则待扩展的
                // 组件会接收不到传值
                <WrappedComponent {...this.props}></WrappedComponent>
            )
        }

        constructor(props){
            super(props);
            this.enterTime = null;
        }

        componentDidMount(){
            // console.log(this);
            // console.log("withUserBehavior组件的mounted");
            console.log(`用户进入了${page}`);
            this.enterTime = Date.now();
        }

        componentWillUnmount(){
            let leaveTime = Date.now();
            let t = leaveTime - this.enterTime;
            console.log(`用户离开了${page}，一共停留了${Math.floor(t/1000)}秒`);
        }
    }
}

export default withUserBehavior;